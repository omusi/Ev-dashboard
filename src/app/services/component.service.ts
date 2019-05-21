import {Injectable} from '@angular/core';
import {CentralServerService} from './central-server.service';
import { PricingSettings, PricingSettingsType, OcpiSettings, SacSettings, RefundSettings } from 'app/common.types';
import { Observable } from 'rxjs';

export enum ComponentEnum {
  OCPI = 'ocpi',
  ORGANIZATION = 'organization',
  PRICING = 'pricing',
  REFUND = 'refund',
  SAC = 'sac'
}

@Injectable()
export class ComponentService {
  private activeComponents?: Array<string>;

  constructor(
      private centralServerService: CentralServerService) {
    this.centralServerService.getCurrentUserSubject().subscribe(user => {
      if (user) {
        this.activeComponents = user.activeComponents;
      } else {
        this.activeComponents = null;
      }
    });
  }

  public isActive(componentName: ComponentEnum): boolean {
    if (this.activeComponents) {
      return this.activeComponents.includes(componentName);
    } else {
      return false;
    }
  }

  public getActiveComponents(): string[] {
    return this.activeComponents;
  }

  public getPricingSettings(): Observable<PricingSettings> {
    return new Observable((observer) => {
      const pricingSettings = {
        identifier: ComponentEnum.PRICING
      } as PricingSettings;
      // Get the Pricing settings
      this.centralServerService.getSettings(ComponentEnum.PRICING).subscribe((settings) => {
        // Get the currency
        if (settings && settings.count > 0 && settings.result[0].content) {
          const config = settings.result[0].content;
          // ID
          pricingSettings.id = settings.result[0].id;
          // Simple price
          if (config.simple) {
            pricingSettings.type = PricingSettingsType.simple;
            pricingSettings.simplePricing = {
              price: config.simple.price ? parseFloat(config.simple.price) : 0,
              currency: config.simple.currency ? config.simple.currency : ''
            }
          }
          // Convergeant Charging
          if (config.convergentCharging) {
            pricingSettings.type = PricingSettingsType.convergentCharging;
            pricingSettings.convergentChargingPricing = {
              url: config.convergentCharging.url ? config.convergentCharging.url : '',
              chargeableItemName: config.convergentCharging.chargeableItemName ? config.convergentCharging.chargeableItemName : '',
              user: config.convergentCharging.user ? config.convergentCharging.user : '',
              password: config.convergentCharging.password ? config.convergentCharging.password : ''
            }
          }
        }
        observer.next(pricingSettings);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  public getOcpiSettings(): Observable<OcpiSettings> {
    return new Observable((observer) => {
      const ocpiSettings = {
        identifier: ComponentEnum.OCPI
      } as OcpiSettings;
      // Get the Pricing settings
      this.centralServerService.getSettings(ComponentEnum.OCPI).subscribe((settings) => {
        // Get the currency
        if (settings && settings.count > 0 && settings.result[0].content) {
          const config = settings.result[0].content;
          // ID
          ocpiSettings.id = settings.result[0].id;
          // Set
          ocpiSettings.country_code = config.country_code;
          ocpiSettings.party_id = config.party_id;
          ocpiSettings.business_details = config.business_details;
        }
        observer.next(ocpiSettings);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  public getSacSettings(): Observable<SacSettings> {
    return new Observable((observer) => {
      const sacSettings = {
        identifier: ComponentEnum.SAC
      } as SacSettings;
      // Get the Pricing settings
      this.centralServerService.getSettings(ComponentEnum.SAC).subscribe((settings) => {
        // Get the currency
        if (settings && settings.count > 0 && settings.result[0].content) {
          const config = settings.result[0].content;
          // ID
          sacSettings.id = settings.result[0].id;
          // Set
          sacSettings.mainUrl = config.mainUrl;
          sacSettings.timezone = config.timezone;
          sacSettings.links = config.links;
        }
        observer.next(sacSettings);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  public getRefundSettings(): Observable<RefundSettings> {
    return new Observable((observer) => {
      const refundSettings = {
        identifier: ComponentEnum.REFUND
      } as RefundSettings;
      // Get the Pricing settings
      this.centralServerService.getSettings(ComponentEnum.REFUND).subscribe((settings) => {
        // Get the currency
        if (settings && settings.count > 0 && settings.result[0].content) {
          const config = settings.result[0].content;
          // ID
          refundSettings.id = settings.result[0].id;
          // Set
          refundSettings.concur = config.concur;
        }
        observer.next(refundSettings);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }
}
