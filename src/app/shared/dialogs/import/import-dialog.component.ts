import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { StatusCodes } from 'http-status-codes';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { NgxCsvParser } from 'ngx-csv-parser';
import { CentralServerService } from 'services/central-server.service';
import { MessageService } from 'services/message.service';
import { ActionsResponse } from 'types/DataResult';
import { HTTPError } from 'types/HTTPError';
import { ServerAction } from 'types/Server';
import { Utils } from 'utils/Utils';

@Component({
  templateUrl: './import-dialog.component.html',
})
export class ImportDialogComponent implements OnInit {
  public uploader: FileUploader;
  public response: string;
  public progress = 0;
  public uploadInProgress = false;
  public fileName = '';
  public importInstructions: string;
  public isFileValid = true;
  public title: string;
  private ngxCsvParser: NgxCsvParser;
  private endpoint: ServerAction;
  private requiredProperties: string[];
  private messageSuccess: string;
  private messageError: string;
  private messageSuccessAndError: string;
  private messageNoSuccessNoError: string;

  public constructor(
    protected dialogRef: MatDialogRef<ImportDialogComponent>,
    protected translateService: TranslateService,
    private centralServerService: CentralServerService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) data) {
    if (data?.endpoint) {
      this.endpoint = data.endpoint;
      this.title = translateService.instant(`${data.entity}.import_${data.entity}`);
      this.messageSuccess = `${data.entity}.import_${data.entity}_success`;
      this.messageError = `${data.entity}.import_${data.entity}_error`;
      this.messageSuccessAndError = `${data.entity}.import_${data.entity}_partial`;
      this.messageNoSuccessNoError = `${data.entity}.import_no_${data.entity}`;
      this.requiredProperties = data.requiredProperties;
    }
    Utils.registerCloseKeyEvents(this.dialogRef);
    this.uploader = new FileUploader({
      headers: this.centralServerService.buildHttpHeadersFile(),
      url: `${this.centralServerService.getCentralRestServerServiceSecuredURL()}/${this.endpoint}`
    });
    this.uploader.response.subscribe(res => this.response = res);
    this.ngxCsvParser = new NgxCsvParser();
  }

  public ngOnInit() {
    this.importInstructions = this.translateService.instant('general.import_instructions', { properties: this.requiredProperties.join(', ') });
    // File has been selected
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
      fileItem.withCredentials = false;
      this.fileName = fileItem.file.name;
      this.isFileValid = this.ngxCsvParser.isCSVFile(fileItem._file);
    };
    // Display the progress bar during the upload
    this.uploader.onProgressAll = (progress: any) => {
      this.progress = progress;
      this.uploadInProgress = true;
    };
    // File upload has finished
    this.uploader.onCompleteItem = (fileItem: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      // Success
      if (status === StatusCodes.OK) {
        // Ok: Check result
        const actionsResponse = JSON.parse(response) as ActionsResponse;
        this.messageService.showActionsMessage(actionsResponse,
          this.messageSuccess, this.messageError, this.messageSuccessAndError, this.messageNoSuccessNoError);
      // Error
      } else {
        switch (status) {
          case HTTPError.INVALID_FILE_FORMAT:
            this.messageService.showErrorMessage('general.invalid_file_error');
            break;
          case HTTPError.INVALID_FILE_CSV_HEADER_FORMAT:
            this.messageService.showErrorMessage('general.invalid_file_csv_header_error');
            break;
          default:
            this.messageService.showErrorMessage('general.error_import');
            break;
        }
      }
      this.uploader.destroy();
      this.dialogRef.close();
    };
  }

  public cancel() {
    this.uploader.destroy();
    this.dialogRef.close();
  }

  public upload(): void {
    this.uploader.uploadAll();
  }
}
