import { Injectable } from '@angular/core';
import { SiteArea, User } from '../common.types';
import { Constants } from '../utils/Constants';
import { CentralServerService } from './central-server.service';
import { ComponentEnum, ComponentService } from './component.service';

@Injectable()
export class AuthorizationService {
  private loggedUser: User;

  constructor(
    private centralServerService: CentralServerService,
    private componentService: ComponentService) {

    this.centralServerService.getCurrentUserSubject().subscribe(user => {
      this.loggedUser = user;
    });
  }

  public cleanUserAndUserAuthorization() {
    this.loggedUser = null;
  }

  public canUpdateChargingStation(): boolean {
    return this.canAccess(Constants.ENTITY_CHARGING_STATION, Constants.ACTION_UPDATE);
  }

  public canUpdateCompany(): boolean {
    return this.canAccess(Constants.ENTITY_COMPANY, Constants.ACTION_UPDATE);
  }

  public canUpdateSite(): boolean {
    return this.canAccess(Constants.ENTITY_SITE, Constants.ACTION_UPDATE);
  }

  public canUpdateSiteArea(): boolean {
    return this.canAccess(Constants.ENTITY_SITE_AREA, Constants.ACTION_UPDATE);
  }

  public canListSettings(): boolean {
    return this.canAccess(Constants.ENTITY_SETTINGS,
      Constants.ACTION_LIST);
  }

  public canUpdateUser(): boolean {
    return this.canAccess(Constants.ENTITY_USER, Constants.ACTION_UPDATE);
  }

  public canAccess(resource: String, action: String): boolean {
    return this.loggedUser && this.loggedUser.scopes && this.loggedUser.scopes.includes(`${resource}:${action}`);
  }

  public canStopTransaction(siteArea: SiteArea, badgeID: string) {
    if (this.canAccess(Constants.ENTITY_CHARGING_STATION, Constants.ACTION_REMOTE_STOP_TRANSACTION)) {
      if (this.loggedUser.tagIDs.includes(badgeID)) {
        return true;
      }
      if (this.componentService.isActive(ComponentEnum.ORGANIZATION)) {
        return siteArea && this.isSiteAdmin(siteArea.siteID);
      }
      return this.isAdmin();
    }
    return false;
  }

  public canStartTransaction(siteArea: SiteArea) {
    if (this.canAccess(Constants.ENTITY_CHARGING_STATION, Constants.ACTION_REMOTE_START_TRANSACTION)) {
      if (this.componentService.isActive(ComponentEnum.ORGANIZATION)) {
        if (!siteArea) {
          return false;
        }
        return !siteArea.accessControl || this.isSiteAdmin(siteArea.siteID) || this.loggedUser.sites.includes(siteArea.siteID);
      }
      return true;
    }
    return false;
  }

  public canReadTransaction(siteArea: SiteArea, badgeID: string) {
    if (this.canAccess(Constants.ENTITY_TRANSACTION, Constants.ACTION_READ)) {
      if (this.loggedUser.tagIDs.includes(badgeID)) {
        return true;
      }
      if (this.componentService.isActive(ComponentEnum.ORGANIZATION) && siteArea) {
        return this.isSiteAdmin(siteArea.siteID) || (this.isDemo() && this.isSiteUser(siteArea.siteID));
      }
      return this.isAdmin() || this.isDemo();
    }
    return false;
  }

  public isSiteAdmin(siteID: string): boolean {
    if (this.isAdmin()) {
      return true;
    }
    if (this.canAccess(Constants.ENTITY_SITE, Constants.ACTION_UPDATE)) {
      return this.loggedUser.sitesAdmin && this.loggedUser.sitesAdmin.includes(siteID);
    }
    return false;
  }

  public isSiteUser(siteID: string): boolean {
    if (this.isAdmin()) {
      return true;
    }
    if (this.canAccess(Constants.ENTITY_SITE, Constants.ACTION_READ)) {
      return this.loggedUser.sites && this.loggedUser.sites.includes(siteID);
    }
    return false;
  }

  public isAdmin(): boolean {
    if (this.loggedUser) {
      return this.loggedUser.role === Constants.ROLE_ADMIN;
    }
    return false;
  }

  public getSitesAdmin(): ReadonlyArray<string> {
    return this.loggedUser.sitesAdmin;
  }

  public isSuperAdmin(): boolean {
    if (this.loggedUser) {
      return this.loggedUser.role === Constants.ROLE_SUPER_ADMIN;
    }
    return false;
  }

  public isBasic(): boolean {
    if (this.loggedUser) {
      return this.loggedUser.role === Constants.ROLE_BASIC;
    }
    return false;
  }

  public isDemo(): boolean {
    if (this.loggedUser) {
      return this.loggedUser.role === Constants.ROLE_DEMO;
    }
    return false;
  }
}
