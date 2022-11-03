import { Component, Input, ViewChild } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';

import { CentralServerService } from '../../../../services/central-server.service';
import { MessageService } from '../../../../services/message.service';
import { CellContentTemplateDirective } from '../../../../shared/table/cell-content-template/cell-content-template.directive';
import { RestResponse } from '../../../../types/GlobalType';
import { SiteUser, UserToken } from '../../../../types/User';
import { Utils } from '../../../../utils/Utils';

@Component({
  template: `
    <div class="d-flex justify-content-center">
      <mat-radio-button #rbid class="mx-auto"
        [checked]="(row.siteOwner ? row.siteOwner : false)"
        [disabled]="(!loggedUser.sitesAdmin.includes(row.siteID) && loggedUser.role !== 'A')"
        (change)="changeRadioButton($event)">
      </mat-radio-button>
    </div>`
})
export class SiteUsersOwnerRadioComponent extends CellContentTemplateDirective {
  @Input() public row!: SiteUser;
  @ViewChild('rbid') public radioButtonRef!: MatRadioButton;
  public loggedUser: UserToken;

  public constructor(
    private messageService: MessageService,
    private centralServerService: CentralServerService,
    private router: Router) {
    super();
    this.loggedUser = centralServerService.getLoggedUser();
  }

  public changeRadioButton(matRadioChange: MatRadioChange) {
    // uncheck the previous siteOwner
    this.radioButtonRef.checked = !this.radioButtonRef.checked;
    // check the new siteOwner
    matRadioChange.source.checked  = !matRadioChange.source.checked;
    // update in db
    this.setUserSiteOwner(this.row, this.radioButtonRef.checked);
  }

  private setUserSiteOwner(siteUser: SiteUser, siteOwner: boolean) {
    // Update
    this.centralServerService.updateSiteOwner(siteUser.siteID, siteUser.user.id, siteOwner).subscribe((response) => {
      if (response.status === RestResponse.SUCCESS) {
        if (siteOwner) {
          this.messageService.showSuccessMessage('sites.update_set_site_owner_success', {userName: Utils.buildUserFullName(siteUser.user)});
        } else {
          this.messageService.showSuccessMessage('sites.update_remove_site_owner_success', {userName: Utils.buildUserFullName(siteUser.user)});
        }
      } else {
        Utils.handleError(JSON.stringify(response),
          this.messageService, 'sites.update_site_users_owner_error', {
            userName: Utils.buildUserFullName(siteUser.user),
          });
      }
    }
    ,
    (error) => {
      Utils.handleHttpError(error, this.router, this.messageService, this.centralServerService,
        'sites.update_site_users_owner_error', {userName: Utils.buildUserFullName(siteUser.user)});
    },
    );
  }
}
