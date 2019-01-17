import { Component, Input, OnInit, Injectable } from '@angular/core';
import { Charger } from '../../../../common.types';
import { DatePipe } from '@angular/common';
import { LocaleService } from '../../../../services/locale.service';

@Component({
  selector: 'app-charger-properties',
  styleUrls: ['../../charging-stations-data-source-table.scss', '../../../../shared/table/table.component.scss'],
  templateUrl: './charging-station-properties.html'
})
@Injectable()
export class ChargingStationPropertiesComponent implements OnInit {
  @Input() charger: Charger;
  chargerFormatted: any = {};
  displayedProperties = [
    { key: 'chargePointVendor', title: 'chargers.vendor' },
    { key: 'chargePointModel', title: 'chargers.model' },
    { key: 'chargeBoxSerialNumber', title: 'chargers.serial_number' },
    { key: 'firmwareVersion', title: 'chargers.firmware_version' },
    { key: 'endpoint', title: 'chargers.private_url' },
    { key: 'chargingStationURL', title: 'chargers.public_url' },
    { key: 'ocppVersion', title: 'chargers.ocpp_version' },
    {
      key: 'lastReboot', title: 'chargers.last_reboot', formatter: (value) => {
        return new DatePipe(this.localeService.language).transform(value, 'medium');
      }
    },
    {
      key: 'createdOn', title: 'chargers.created_on', formatter: (value) => {
        return new DatePipe(this.localeService.language).transform(value, 'medium');
      }
    }
  ];

  constructor(private localeService: LocaleService) {
  }

  ngOnInit(): void {
    for (const property of this.displayedProperties) {
      if (property.formatter) {
        this.chargerFormatted[property.key] = property.formatter(this.charger[property.key]);
      } else {
        this.chargerFormatted[property.key] = this.charger[property.key];
      }
    }
  }

}
