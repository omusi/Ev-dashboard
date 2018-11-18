import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TableDataSource} from '../../shared/table/table-data-source';
import {Log, SubjectInfo, TableActionDef, TableColumnDef, TableDef, TableFilterDef} from '../../common.types';
import {CentralServerNotificationService} from '../../services/central-server-notification.service';
import {TableAutoRefreshAction} from '../../shared/table/actions/table-auto-refresh-action';
import {TableRefreshAction} from '../../shared/table/actions/table-refresh-action';
import {CentralServerService} from '../../services/central-server.service';
import {LocaleService} from '../../services/locale.service';
import {MessageService} from '../../services/message.service';
import {SpinnerService} from '../../services/spinner.service';
import {LogSourceTableFilter} from './filters/log-source-filter';
import {LogLevelTableFilter} from './filters/log-level-filter';
import {Formatters} from '../../utils/Formatters';
import {Utils} from '../../utils/Utils';
import {LogActionTableFilter} from './filters/log-action-filter';
import {LogDateTableFilter} from './filters/log-date-filter';
import {UserTableFilter} from '../../shared/table/filters/user-filter';
import {AppLogLevelIconPipe} from './formatters/app-log-level-icon.pipe';
import {AppDatePipe} from '../../shared/formatters/app-date.pipe';

export class LogsDataSource extends TableDataSource<Log> {
  constructor(
    private localeService: LocaleService,
    private messageService: MessageService,
    private spinnerService: SpinnerService,
    private router: Router,
    private centralServerNotificationService: CentralServerNotificationService,
    private centralServerService: CentralServerService,
    private datePipe: AppDatePipe) {
    super();
  }

  public getDataChangeSubject(): Observable<SubjectInfo> {
    return this.centralServerNotificationService.getSubjectLoggings();
  }

  public loadData() {
    // Show
    this.spinnerService.show();
    // Get data
    this.centralServerService.getLogs(this.getFilterValues(),
      this.getPaging(), this.getOrdering()).subscribe((logs) => {
      // Show
      this.spinnerService.hide();
      // Set number of records
      this.setNumberOfRecords(logs.count);
      // Update page length
      this.updatePaginator();
      // Add the users in the message
      logs.result.map((log) => {
        let user;
        // Set User
        if (log.user) {
          user = log.user;
        }
        // Set Action On User
        if (log.actionOnUser) {
          user = (user ? `${user} > ${log.actionOnUser}` : log.actionOnUser);
        }
        // Set
        if (user) {
          log.message = `${user} > ${log.message}`;
        }
        return log;
      });
      // Return logs
      this.getDataSubjet().next(logs.result);
      // Keep the result
      this.setData(logs.result);
    }, (error) => {
      // Show
      this.spinnerService.hide();
      // No longer exists!
      Utils.handleHttpError(error, this.router, this.messageService, this.centralServerService, 'general.error_backend');
    });
  }

  public getRowDetails(row: Log): Observable<String> {
    // Read the log details
    return this.centralServerService.getLog(row.id)
      .map((log => Formatters.formatTextToHTML(log.detailedMessages)));
  }

  public getTableDef(): TableDef {
    return {
      search: {
        enabled: true
      },
      rowDetails: {
        enabled: true,
        detailsField: 'detailedMessages',
        hideShowField: 'hasDetailedMessages'
      }
    };
  }

  public getTableColumnDefs(): TableColumnDef[] {
    return [
      {
        id: 'level',
        name: 'logs.level',
        formatter: (logLevel) => new AppLogLevelIconPipe().transform(logLevel, {iconClass: 'pt-1'}),
        headerClass: 'col-75px',
        class: 'col-75px',
        sortable: true
      },
      {
        id: 'timestamp',
        type: 'date',
        formatter: (createdOn) => this.datePipe.transform(createdOn, 'datetime'),
        name: 'logs.date',
        headerClass: 'col-200px',
        class: 'text-left col-200px',
        sorted: true,
        direction: 'desc',
        sortable: true
      },
      {
        id: 'source',
        name: 'logs.source',
        headerClass: 'col-200px',
        class: 'text-left col-150px',
        sortable: true
      },
      {
        id: 'action',
        name: 'logs.action',
        headerClass: 'col-200px',
        class: 'text-left col-200px',
        sortable: true
      },
      {
        id: 'message',
        name: 'logs.message',
        headerClass: 'col-500px',
        class: 'text-left col-600px',
        sortable: true
      }
    ];
  }

  public getPaginatorPageSizes() {
    return [50, 100, 250, 500, 1000, 2000];
  }

  public getTableActionsDef(): TableActionDef[] {
    return [
      new TableRefreshAction().getActionDef()
    ];
  }

  public getTableActionsRightDef(): TableActionDef[] {
    return [
      new TableAutoRefreshAction(false).getActionDef()
    ];
  }

  public getTableFiltersDef(): TableFilterDef[] {
    return [
      new LogDateTableFilter().getFilterDef(),
      new LogLevelTableFilter(this.centralServerService).getFilterDef(),
      new LogSourceTableFilter().getFilterDef(),
      new UserTableFilter().getFilterDef(),
      new LogActionTableFilter(this.centralServerService).getFilterDef()
    ];
  }
}
