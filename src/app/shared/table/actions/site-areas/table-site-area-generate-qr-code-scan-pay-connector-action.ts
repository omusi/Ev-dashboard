import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as FileSaver from 'file-saver';

import { CentralServerService } from '../../../../services/central-server.service';
import { MessageService } from '../../../../services/message.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { TableAction } from '../../../../shared/table/actions/table-action';
import { ChargingStationButtonAction } from '../../../../types/ChargingStation';
import { ButtonActionColor } from '../../../../types/GlobalType';
import { SiteArea } from '../../../../types/SiteArea';
import { TableActionDef } from '../../../../types/Table';
import { Utils } from '../../../../utils/Utils';

export interface TableSiteAreaGenerateQrCodeScanPayConnectorsActionDef extends TableActionDef {
  action: (siteArea: SiteArea, translateService: TranslateService, spinnerService: SpinnerService,
    messageService: MessageService, centralServerService: CentralServerService, router: Router) => void;
}

export class TableSiteAreaGenerateQrCodeScanPayConnectorAction implements TableAction {
  private action: TableSiteAreaGenerateQrCodeScanPayConnectorsActionDef = {
    id: ChargingStationButtonAction.GENERATE_QR_CODE_SCAN_PAY,
    type: 'button',
    icon: 'qr_code',
    color: ButtonActionColor.ACCENT,
    name: 'general.generate_qr_scan_pay',
    tooltip: 'general.tooltips.generate_qr_scan_pay',
    action: this.downloadQrCodeScanPayPDF,
  };

  public getActionDef(): TableSiteAreaGenerateQrCodeScanPayConnectorsActionDef {
    return this.action;
  }

  private downloadQrCodeScanPayPDF(siteArea: SiteArea, translateService: TranslateService, spinnerService: SpinnerService,
    messageService: MessageService, centralServerService: CentralServerService, router: Router) {
    spinnerService.show();
    centralServerService.downloadSiteAreaQrCodes(siteArea.id, true).subscribe({
      next: (result) => {
        spinnerService.hide();
        FileSaver.saveAs(result, `site-area-${siteArea.name.toLowerCase()}-qr-codes-scan-pay.pdf`);
      },
      error: (error) => {
        spinnerService.hide();
        Utils.handleHttpError(error, router, messageService,
          centralServerService, translateService.instant('chargers.qr_code_generation_error'));
      }
    });
  }
}
