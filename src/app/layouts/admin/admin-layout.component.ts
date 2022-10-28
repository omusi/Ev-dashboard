import { Location, PopStateEvent } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { WindowService } from 'services/window.service';
import { Utils } from 'utils/Utils';

import { NavbarComponent } from '../../shared/navbar/navbar.component';

declare const $: any;

@Component({
  selector: 'app-layout',
  templateUrl: 'admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild('sidebar') public sidebar: any;
  @ViewChild(NavbarComponent, { static: true }) public navbar!: NavbarComponent;

  public url!: string;
  public location: Location;
  public showSidebar = true;

  private lastPoppedUrl!: string | null;
  private yScrollStack: number[] = [];

  public constructor(
    private windowService: WindowService,
    private router: Router, location: Location
  ) {
    // Hide/Show Sidebar
    const showSidebar = this.windowService.getUrlParameterValue('ShowSidebar');
    if (!Utils.isNullOrUndefined(showSidebar)) {
      this.showSidebar = Utils.convertToBoolean(
        this.windowService.getUrlParameterValue('ShowSidebar'));
    }
    this.location = location;
  }

  public ngOnInit() {
    const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev && ev.url ? ev.url : null;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = null;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      elemMainPanel.scrollTop = 0;
    });
    const html = document.getElementsByTagName('html')[0];
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      html.classList.add('perfect-scrollbar-on');
    } else {
      html.classList.add('perfect-scrollbar-off');
    }
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.navbar.sidebarClose();
    });
  }

  public isMap() {
    if (this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen') {
      return true;
    }
    return false;
  }

  public isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
