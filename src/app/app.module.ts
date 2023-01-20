import 'dayjs/locale/cs';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/en-au';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/it';
import 'dayjs/locale/pt';

import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeCs from '@angular/common/locales/cs'; // ACHTUNG - cz does not exists ==> cs-CZ
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeEnAU from '@angular/common/locales/en-AU';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localePt from '@angular/common/locales/pt';
import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateDefaultParser, TranslateLoader, TranslateModule, TranslateParser, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Observable, Observer } from 'rxjs';
import { FeatureService } from 'services/feature.service';
import { UtilsService } from 'services/utils.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { BrowserNotSupportedModule } from './browser-not-supported/browser-not-supported.module';
import { DevEnvGuard } from './guard/development.guard';
import { RouteGuardService } from './guard/route-guard';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { WINDOW_PROVIDERS } from './providers/window.provider';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { AuthorizationService } from './services/authorization.service';
import { CentralServerService } from './services/central-server.service';
import { ComponentService } from './services/component.service';
import { ConfigService } from './services/config.service';
import { LocalStorageService } from './services/local-storage.service';
import { LocaleService } from './services/locale.service';
import { MessageService } from './services/message.service';
import { SpinnerService } from './services/spinner.service';
import { StripeService } from './services/stripe.service';
import { WindowService } from './services/window.service';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { Utils } from './utils/Utils';

// Init locales
registerLocaleData(localeCs);
registerLocaleData(localeDe);
registerLocaleData(localeEn);
registerLocaleData(localeEnAU);
registerLocaleData(localeEs);
registerLocaleData(localeFr);
registerLocaleData(localeIt);
registerLocaleData(localePt);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
class OwlDateTimeTranslatedIntl extends OwlDateTimeIntl {
  public constructor(private translate: TranslateService) {
    super();
    this.loadTranslation();
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslation();
    });
  }

  private loadTranslation() {
    this.upSecondLabel = this.translate.instant('general.components.date_time.up_second_label');
    this.downSecondLabel = this.translate.instant('general.components.date_time.down_second_label');
    this.upMinuteLabel = this.translate.instant('general.components.date_time.up_minute_label');
    this.downMinuteLabel = this.translate.instant('general.components.date_time.down_minute_label');
    this.upHourLabel = this.translate.instant('general.components.date_time.up_hour_label');
    this.downHourLabel = this.translate.instant('general.components.date_time.down_hour_label');
    this.prevMonthLabel = this.translate.instant('general.components.date_time.prev_month_label');
    this.nextMonthLabel = this.translate.instant('general.components.date_time.next_month_label');
    this.prevYearLabel = this.translate.instant('general.components.date_time.prev_year_label');
    this.nextYearLabel = this.translate.instant('general.components.date_time.next_year_label');
    this.prevMultiYearLabel = this.translate.instant('general.components.date_time.prev_multi_year_label');
    this.nextMultiYearLabel = this.translate.instant('general.components.date_time.next_multi_year_label');
    this.switchToMonthViewLabel = this.translate.instant('general.components.date_time.switch_to_month_view_label');
    this.switchToMultiYearViewLabel = this.translate.instant('general.components.date_time.switch_to_multi_year_view_label');
    this.cancelBtnLabel = this.translate.instant('general.components.date_time.cancel_btn_label');
    this.setBtnLabel = this.translate.instant('general.components.date_time.set_btn_label');
    this.rangeFromLabel = this.translate.instant('general.components.date_time.range_from_label');
    this.rangeToLabel = this.translate.instant('general.components.date_time.range_to_label');
    this.hour12AMLabel = this.translate.instant('general.components.date_time.hour_12_am_label');
    this.hour12PMLabel = this.translate.instant('general.components.date_time.hour_12_pm_label');
  }
};

const OWL_DATE_TIME_CUSTOM_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'short', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  providers: [
    { provide: OwlDateTimeIntl, useClass: OwlDateTimeTranslatedIntl },
    { provide: OWL_DATE_TIME_FORMATS, useValue: OWL_DATE_TIME_CUSTOM_FORMATS },
  ]
})
export class MaterialModule {
}

// Load translations from "/assets/i18n/[lang].json" ([lang] is the lang
export const httpLoaderFactory = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json?version=2.7.3');

const initAppFactory = (centralServerService: CentralServerService, configService: ConfigService,
  messageService: MessageService, translateService: TranslateService): () => Observable<void> =>
  () => (new Observable((observer: Observer<void>) => {
    // Load Configuration
    configService.initConfig().subscribe({
      complete: () => {
        // Load User Token
        centralServerService.initUserToken().subscribe({
          complete: () => {
            // Default
            let language = translateService.getBrowserLang();
            // Get current user
            const loggedUser = centralServerService.getLoggedUser();
            if (loggedUser?.language) {
              language = loggedUser.language;
            }
            // Init Translate service
            translateService.addLangs(['en', 'fr', 'es', 'de', 'pt', 'it', 'cs']);
            translateService.setDefaultLang('en');
            translateService.use(language.match(/en|fr|es|de|pt|it|cs/) ? language : 'en');
            // Init Done
            observer.complete();
          },
          error: (error) => {
            messageService.showErrorMessage('Error while trying to read the current logged user!');
            console.log(error);
          }
        });
      },
      error: (error) => {
        messageService.showErrorMessage('Error while loading the configuration file!');
        console.log(error);
      }
    });
  }));


@Injectable()
class CustomTranslateDefaultParser extends TranslateDefaultParser {
  public getValue(target: any, key: string): any {
    let value = super.getValue(target, key);
    if (!Utils.isEmptyArray(value)) {
      value = (value as string[]).join('<br>');
    }
    return value;
  }
}

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    MaterialModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    HttpClientModule,
    BrowserNotSupportedModule,
    GoogleMapsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      parser: {
        provide: TranslateParser,
        useClass: CustomTranslateDefaultParser
      },
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ReleaseNotesComponent,
  ],
  exports: [
    TranslateModule,
  ],
  providers: [
    WINDOW_PROVIDERS,
    CentralServerService,
    AuthorizationService,
    ComponentService,
    FeatureService,
    DevEnvGuard,
    RouteGuardService,
    SpinnerService,
    LocaleService,
    LocalStorageService,
    MessageService,
    ConfigService,
    UtilsService,
    TranslateService,
    WindowService,
    StripeService,
    { provide: APP_INITIALIZER, useFactory: initAppFactory, deps: [CentralServerService, ConfigService, MessageService, TranslateService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
