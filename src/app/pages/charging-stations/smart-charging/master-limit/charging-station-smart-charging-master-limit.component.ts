// tslint:disable-next-line:max-line-length
import { Component, ElementRef, EventEmitter, Injectable, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Charger, ConnectorSchedule } from 'app/common.types';
import { AuthorizationService } from 'app/services/authorization.service';
import { CentralServerService } from 'app/services/central-server.service';
import { DialogService } from 'app/services/dialog.service';
import { LocaleService } from 'app/services/locale.service';
import { MessageService } from 'app/services/message.service';
import { SpinnerService } from 'app/services/spinner.service';
import { ChargingStations } from 'app/utils/ChargingStations';
import { Constants } from 'app/utils/Constants';
import { Utils } from 'app/utils/Utils';
import { ChargingStationSmartChargingPowerSliderComponent } from '../component/charging-station-smart-charging-power-slider.component';

@Component({
  selector: 'app-charging-station-smart-charging-master-limit',
  templateUrl: './charging-station-smart-charging-master-limit.component.html',
})
@Injectable()
export class ChargingStationSmartChargingMasterLimitComponent implements OnInit {
  @Input() charger: Charger;
  @Output() applyPlanningEventEmitter = new EventEmitter<any>();
  public userLocales;
  public isAdmin;

  public powerUnit;
  public compositeSchedule;
  public hasNoActivePlanning = true;
  public hasNoCompositeResultAccepted = true;
  public startScheduleDate: Date;
  public endScheduleDate: Date;
  public minChargingRate: number;
  public internalFormatCurrentLimit: number;
  public currentDisplayedLimit: number;
  public limitPlanning: ConnectorSchedule[] = [];
  displayedColumns: string[] = ['from', 'to', 'limit'];

  @ViewChild('powerSlider', { static: true }) powerSliderComponent: ChargingStationSmartChargingPowerSliderComponent;

  constructor(
    private authorizationService: AuthorizationService,
    private centralServerService: CentralServerService,
    private messageService: MessageService,
    private spinnerService: SpinnerService,
    private translateService: TranslateService,
    private localeService: LocaleService,
    private dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService) {

    // Check auth
    if (!authorizationService.canUpdateChargingStation()) {
      // Not authorized
      this.router.navigate(['/']);
    }
    // Get Locales
    this.userLocales = this.localeService.getLocales();
    // Admin?
    this.isAdmin = this.authorizationService.isAdmin() || this.authorizationService.isSuperAdmin();
  }

  ngOnInit(): void {
    // Initialize slider values
    this.powerUnit = (this.charger.powerLimitUnit ? this.charger.powerLimitUnit : Constants.OCPP_UNIT_AMPER);
  }

  public applyPowerLimit() {
    // show yes/no dialog
    const self = this;
    this.dialogService.createAndShowYesNoDialog(
      this.translateService.instant('chargers.smart_charging.power_limit_title'),
      this.translateService.instant('chargers.smart_charging.power_limit_confirm',
        { chargeBoxID: this.charger.id, power: this.powerSliderComponent.getDisplayedValue('kW') }),
    ).subscribe((result) => {
      if (result === Constants.BUTTON_TYPE_YES) {
        // call REST service
        // tslint:disable-next-line:max-line-length
        this.centralServerService.chargingStationLimitPower(this.charger, 0, this.powerUnit, ChargingStations.provideLimit(this.charger, this.powerSliderComponent.powerSliderValue), 0).subscribe((response) => {
          if (response.status === Constants.OCPP_RESPONSE_ACCEPTED) {
            // success + reload
            this.messageService.showSuccessMessage(
              this.translateService.instant('chargers.smart_charging.power_limit_success',
                { chargeBoxID: self.charger.id, power: this.powerSliderComponent.getDisplayedValue('kW') }),
            );
            this.applyPlanningEventEmitter.emit();
          } else {
            Utils.handleError(JSON.stringify(response),
              this.messageService, this.translateService.instant('chargers.smart_charging.power_limit_error'));
          }
        }, (error) => {
          this.spinnerService.hide();
          this.dialog.closeAll();
          Utils.handleHttpError(
            error, this.router, this.messageService, this.centralServerService, 'chargers.smart_charging.power_limit_error');
        });
      }
    });
  }

  public limitChanged(newValue) {
    this.internalFormatCurrentLimit = newValue;
    //    this.powerSliderComponent.powerSliderValue = newValue;
    this.powerSliderComponent.setSliderValue(this.internalFormatCurrentLimit, 'W');
  }

}
