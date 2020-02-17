import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from 'app/services/spinner.service';
import { DataResult } from 'app/types/DataResult';
import { ButtonAction, RestResponse } from 'app/types/GlobalType';
import { ErrorMessage, UserInError, UserInErrorType } from 'app/types/InError';
import { SiteButtonAction } from 'app/types/Site';
import { ButtonType, TableActionDef, TableColumnDef, TableDef, TableFilterDef } from 'app/types/Table';
import { User, UserButtonAction } from 'app/types/User';
import { Observable } from 'rxjs';
import { CentralServerNotificationService } from '../../../services/central-server-notification.service';
import { CentralServerService } from '../../../services/central-server.service';
import { ComponentService, ComponentType } from '../../../services/component.service';
import { DialogService } from '../../../services/dialog.service';
import { MessageService } from '../../../services/message.service';
import { ErrorCodeDetailsComponent } from '../../../shared/component/error-code-details/error-code-details.component';
import { AppArrayToStringPipe } from '../../../shared/formatters/app-array-to-string.pipe';
import { AppDatePipe } from '../../../shared/formatters/app-date.pipe';
import { AppUserNamePipe } from '../../../shared/formatters/app-user-name.pipe';
import { TableAssignSitesAction } from '../../../shared/table/actions/table-assign-sites-action';
import { TableAutoRefreshAction } from '../../../shared/table/actions/table-auto-refresh-action';
import { TableDeleteAction } from '../../../shared/table/actions/table-delete-action';
import { TableEditAction } from '../../../shared/table/actions/table-edit-action';
import { TableForceSyncBillingUserAction } from '../../../shared/table/actions/table-force-sync-billing-user-action';
import { TableRefreshAction } from '../../../shared/table/actions/table-refresh-action';
import { ErrorTypeTableFilter } from '../../../shared/table/filters/error-type-table-filter';
import { TableDataSource } from '../../../shared/table/table-data-source';
import ChangeNotification from '../../../types/ChangeNotification';
import { Utils } from '../../../utils/Utils';
import { UserRoleFilter } from '../filters/user-role-filter';
import { AppUserRolePipe } from '../formatters/user-role.pipe';
import { UserStatusFormatterComponent } from '../formatters/user-status-formatter.component';
import { UserSitesDialogComponent } from '../user-sites/user-sites-dialog.component';
import { UserDialogComponent } from '../user/user.dialog.component';

@Injectable()
export class UsersInErrorTableDataSource extends TableDataSource<User> {
  private editAction = new TableEditAction().getActionDef();
  private assignSiteAction = new TableAssignSitesAction().getActionDef();
  private deleteAction = new TableDeleteAction().getActionDef();
  private forceBillingSyncAction = new TableForceSyncBillingUserAction().getActionDef();

  constructor(
      public spinnerService: SpinnerService,
      private messageService: MessageService,
      private translateService: TranslateService,
      private dialogService: DialogService,
      private router: Router,
      private dialog: MatDialog,
      private centralServerNotificationService: CentralServerNotificationService,
      private centralServerService: CentralServerService,
      private componentService: ComponentService,
      private userRolePipe: AppUserRolePipe,
      private userNamePipe: AppUserNamePipe,
      private arrayToStringPipe: AppArrayToStringPipe,
      private datePipe: AppDatePipe) {
    super(spinnerService);
    // Init
    this.initDataSource();
  }

  public getDataChangeSubject(): Observable<ChangeNotification> {
    return this.centralServerNotificationService.getSubjectUsers();
  }

  public loadDataImpl(): Observable<DataResult<User>> {
    return new Observable((observer) => {
      // Get the Tenants
      this.centralServerService.getUsersInError(this.buildFilterValues(),
        this.getPaging(), this.getSorting()).subscribe((users) => {
          this.formatErrorMessages(users.result);
          // Ok
          observer.next(users);
          observer.complete();
      }, (error) => {
        // Show error
        Utils.handleHttpError(error, this.router, this.messageService, this.centralServerService, 'general.error_backend');
        // Error
        observer.error(error);
      });
    });
  }

  public buildTableDef(): TableDef {
    return {
      search: {
        enabled: true,
      },
      hasDynamicRowAction: true,
    };
  }

  public buildTableColumnDefs(): TableColumnDef[] {
    const loggedUserRole = this.centralServerService.getLoggedUser().role;
    const columns = [];
    columns.push(
    {
      id: 'id',
      name: 'transactions.id',
      headerClass: 'd-none d-xl-table-cell',
      class: 'd-none d-xl-table-cell',
    },
    {
      id: 'status',
      name: 'users.status',
      isAngularComponent: true,
      angularComponent: UserStatusFormatterComponent,
      headerClass: 'col-10p text-center',
      class: 'col-10p table-cell-angular-big-component',
      sortable: true,
    },
    {
      id: 'role',
      name: 'users.role',
      formatter: (role: string) => this.translateService.instant(this.userRolePipe.transform(role, loggedUserRole)),
      headerClass: 'col-10p text-center',
      class: 'text-left col-10p text-center',
      sortable: true,
    },
    {
      id: 'name',
      name: 'users.name',
      headerClass: 'col-15p',
      class: 'text-left col-15p',
      sorted: true,
      direction: 'asc',
      sortable: true,
    },
    {
      id: 'firstName',
      name: 'users.first_name',
      headerClass: 'col-15p',
      class: 'text-left col-15p',
      sortable: true,
    },
    {
      id: 'errorCodeDetails',
      name: 'errors.details',
      sortable: false,
      headerClass: 'text-center',
      class: 'action-cell text-center',
      isAngularComponent: true,
      angularComponent: ErrorCodeDetailsComponent,
    },
    {
      id: 'errorCode',
      name: 'errors.title',
      class: 'col-30p',
      sortable: true,
      formatter: (value: string, row: UserInError) => this.translateService.instant(`users.errors.${row.errorCode}.title`),
    },
    {
      id: 'createdOn',
      name: 'users.created_on',
      formatter: (createdOn: Date) => this.datePipe.transform(createdOn),
      headerClass: 'col-15p',
      class: 'col-15p',
      sortable: true,
    });
    return columns as TableColumnDef[];
  }

  public buildTableActionsDef(): TableActionDef[] {
    return super.buildTableActionsDef();
  }

  public buildTableDynamicRowActions(user: UserInError): TableActionDef[] {
    const actions: TableActionDef[] = [this.editAction, this.assignSiteAction, this.deleteAction];

    if (this.componentService.isActive(ComponentType.BILLING)
      && user.billingData.hasSynchroError
      && user.errorCode === UserInErrorType.FAILED_BILLING_SYNCHRO) {
      actions.push(this.forceBillingSyncAction);
    }
    return actions;
  }

  public actionTriggered(actionDef: TableActionDef) {
    // Action
    switch (actionDef.id) {
      case ButtonAction.CREATE:
        this.showUserDialog();
        break;
      default:
        super.actionTriggered(actionDef);
    }
  }

  public rowActionTriggered(actionDef: TableActionDef, rowItem: UserInError) {
    switch (actionDef.id) {
      case ButtonAction.EDIT:
        this.showUserDialog(rowItem);
        break;
      case SiteButtonAction.ASSIGN_SITE:
        this.showSitesDialog(rowItem);
        break;
      case ButtonAction.DELETE:
        this.deleteUser(rowItem);
        break;
      case UserButtonAction.SYNCHRONIZE:
        this.forceUserSynchronization(rowItem);
        break;
      default:
        super.rowActionTriggered(actionDef, rowItem);
    }
  }

  public buildTableActionsRightDef(): TableActionDef[] {
    return [
      new TableAutoRefreshAction(false).getActionDef(),
      new TableRefreshAction().getActionDef(),
    ];
  }

  public buildTableFiltersDef(): TableFilterDef[] {
    // Create error type
    const errorTypes = [];
    errorTypes.push({
      key: UserInErrorType.NOT_ACTIVE,
      value: `users.errors.${UserInErrorType.NOT_ACTIVE}.title`,
    });
    errorTypes.push({
      key: UserInErrorType.NOT_ASSIGNED,
      value: `users.errors.${UserInErrorType.NOT_ASSIGNED}.title`,
    });
    errorTypes.push({
      key: UserInErrorType.INACTIVE_USER_ACCOUNT,
      value: `users.errors.${UserInErrorType.INACTIVE_USER_ACCOUNT}.title`,
    });

    if (this.componentService.isActive(ComponentType.BILLING)) {
      errorTypes.push({
        key: UserInErrorType.FAILED_BILLING_SYNCHRO,
        value: `users.errors.${UserInErrorType.FAILED_BILLING_SYNCHRO}.title`,
      });
    }

    const filters: TableFilterDef[] = [
      new UserRoleFilter(this.centralServerService).getFilterDef(),
    ];

    // Show Error types filter only if Organization component is active
    if (this.componentService.isActive(ComponentType.ORGANIZATION)) {
      filters.push(new ErrorTypeTableFilter(errorTypes).getFilterDef());
    }

    return filters;
  }

  public showUserDialog(user?: UserInError) {
    // Create the dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '80vw';
    dialogConfig.minHeight = '80vh';
    dialogConfig.panelClass = 'transparent-dialog-container';
    if (user) {
      dialogConfig.data = user;
    }
    // disable outside click close
    dialogConfig.disableClose = true;
    // Open
    const dialogRef = this.dialog.open(UserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((saved) => {
      if (saved) {
        this.refreshData().subscribe();
      }
    });
  }

  private formatErrorMessages(users: UserInError[]) {
    users.forEach((user: UserInError) => {
      const path = `users.errors.${user.errorCode}`;
      const errorMessage: ErrorMessage = {
        title: `${path}.title`,
        titleParameters: {},
        description: `${path}.description`,
        descriptionParameters: {},
        action: `${path}.action`,
        actionParameters: {},
      };
      user.errorMessage = errorMessage;
    });
  }

  private showSitesDialog(user?: UserInError) {
    // Create the dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'transparent-dialog-container';
    if (user) {
      dialogConfig.data = user;
    }
    // Open
    this.dialog.open(UserSitesDialogComponent, dialogConfig);
  }

  private deleteUser(user: UserInError) {
    this.dialogService.createAndShowYesNoDialog(
      this.translateService.instant('users.delete_title'),
      this.translateService.instant('users.delete_confirm', {userFullName: this.userNamePipe.transform(user)}),
    ).subscribe((result) => {
      if (result === ButtonType.YES) {
        this.centralServerService.deleteUser(user.id).subscribe((response) => {
          if (response.status === RestResponse.SUCCESS) {
            this.refreshData().subscribe();
            this.messageService.showSuccessMessage('users.delete_success', {userFullName: this.userNamePipe.transform(user)});
          } else {
            Utils.handleError(JSON.stringify(response),
              this.messageService, 'users.delete_error');
          }
        }, (error) => {
          Utils.handleHttpError(error, this.router, this.messageService, this.centralServerService,
            'users.delete_error');
        });
      }
    });
  }

  private forceUserSynchronization(user: UserInError) {
    this.dialogService.createAndShowYesNoDialog(
      this.translateService.instant('settings.billing.force_synchronize_user_dialog_title'),
      this.translateService.instant('settings.billing.force_synchronize_user_dialog_confirm'),
    ).subscribe((response) => {
      if (response === ButtonType.YES) {
        this.messageService.showInfoMessage('settings.billing.synchronize_users_started');
        this.centralServerService.forceUserSynchronizationForBilling(user.id).subscribe((synchronizeResponse) => {
          if (synchronizeResponse.status === RestResponse.SUCCESS) {
            if (synchronizeResponse.synchronized) {
              this.refreshData().subscribe();
              this.messageService.showSuccessMessage(this.translateService.instant('settings.billing.synchronize_users_success',
                {number: synchronizeResponse.synchronized}));
            }
            if (synchronizeResponse.error) {
              this.messageService.showWarningMessage(this.translateService.instant('settings.billing.synchronize_users_failure',
                {number: synchronizeResponse.error}));
            }
          } else {
            Utils.handleError(JSON.stringify(synchronizeResponse), this.messageService, 'settings.billing.synchronize_users_error');
          }
        }, (error) => {
          Utils.handleHttpError(error, this.router, this.messageService, this.centralServerService,
            'settings.billing.synchronize_users_error');
        });
      }
    });
  }
}
