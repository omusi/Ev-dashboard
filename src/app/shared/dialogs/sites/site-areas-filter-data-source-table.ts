import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {SiteArea, TableColumnDef, TableDef} from '../../../common.types';
import {CentralServerService} from '../../../services/central-server.service';
import {MessageService} from '../../../services/message.service';
import {Utils} from '../../../utils/Utils';
import {DialogTableDataSource} from '../dialog-table-data-source';

export class SiteAreasFilterDataSourceTable extends DialogTableDataSource<SiteArea> {
  constructor(
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router,
    private centralServerService: CentralServerService) {
    super();
  }

  loadData() {
    const filterValues = this.getFilterValues();
    filterValues['WithSite'] = true;
    this.centralServerService.getSiteAreas(filterValues,
      this.getPaging(), this.getOrdering()).subscribe((siteAreas) => {
      // Set number of records
      this.setNumberOfRecords(siteAreas.count);
      // Update page length (number of sites is in User)
      this.updatePaginator();
      this.setData(siteAreas.result);
    }, (error) => {
      // No longer exists!
      Utils.handleHttpError(error, this.router, this.messageService, this.centralServerService, 'general.error_backend');
    });
  }

  getTableDef(): TableDef {
    return {
      class: 'table-dialog-list',
      rowSelection: {
        enabled: true,
        multiple: false
      },
      search: {
        enabled: true
      }
    };
  }

  buildTableColumnDefs(): TableColumnDef[] {
    return [
      {
        id: 'name',
        name: this.translateService.instant('site_areas.title'),
        class: 'text-left col-600px',
        sorted: true,
        direction: 'asc',
        sortable: true,
      },
      {
        id: 'site',
        name: this.translateService.instant('sites.title'),
        class: 'text-left col-600px',
        direction: 'asc',
        sortable: true,
        formatter: (name, row: SiteArea) => `${row.site.name}`
      }
    ];
  }
}
