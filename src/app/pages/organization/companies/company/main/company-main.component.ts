import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { CentralServerService } from '../../../../../services/central-server.service';
import { ConfigService } from '../../../../../services/config.service';
import { MessageService } from '../../../../../services/message.service';
import { Address } from '../../../../../types/Address';
import { Company } from '../../../../../types/Company';
import { Constants } from '../../../../../utils/Constants';
import { Utils } from '../../../../../utils/Utils';

@Component({
  selector: 'app-company-main',
  templateUrl: 'company-main.component.html',
})
export class CompanyMainComponent implements OnInit, OnChanges {
  @Input() public formGroup: FormGroup;
  @Input() public company!: Company;
  @Input() public readOnly: boolean;

  public logo = Constants.NO_IMAGE;
  public logoChanged = false;
  public maxSize: number;

  public issuer!: AbstractControl;
  public id!: AbstractControl;
  public name!: AbstractControl;
  public address!: Address;

  public constructor(
    private centralServerService: CentralServerService,
    private messageService: MessageService,
    private configService: ConfigService) {
    this.maxSize = this.configService.getCompany().maxLogoKb;
  }

  public ngOnInit() {
    this.formGroup.addControl('issuer', new FormControl(true));
    this.formGroup.addControl('id', new FormControl(''));
    this.formGroup.addControl('name', new FormControl('',
      Validators.compose([
        Validators.required,
      ])
    ));
    // Form
    this.issuer = this.formGroup.controls['issuer'];
    this.id = this.formGroup.controls['id'];
    this.name = this.formGroup.controls['name'];
    if (this.readOnly) {
      this.formGroup.disable();
    }
  }

  public ngOnChanges() {
    this.loadCompany();
  }

  public loadCompany() {
    if (this.company) {
      if (Utils.objectHasProperty(this.company, 'issuer')) {
        this.formGroup.controls.issuer.setValue(this.company.issuer);
      }
      if (this.company.id) {
        this.formGroup.controls.id.setValue(this.company.id);
      }
      if (this.company.name) {
        this.formGroup.controls.name.setValue(this.company.name);
      }
      if (this.company.address) {
        this.address = this.company.address;
      }
      // Get Company logo
      if (!this.logoChanged) {
        this.centralServerService.getCompanyLogo(this.company.id).subscribe((companyLogo) => {
          this.logoChanged = true;
          if (companyLogo) {
            this.logo = companyLogo;
          }
        });
      }
    }
  }

  public updateCompanyLogo(company: Company) {
    if (this.logo !== Constants.NO_IMAGE) {
      company.logo = this.logo;
    } else {
      company.logo = null;
    }
  }

  public updateCompanyCoordinates(company: Company) {
    if (company.address && company.address.coordinates &&
      !(company.address.coordinates[0] || company.address.coordinates[1])) {
      delete company.address.coordinates;
    }
  }

  public onLogoChanged(event: any) {
    // load picture
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > (this.maxSize * 1024)) {
        this.messageService.showErrorMessage('companies.logo_size_error', { maxPictureKb: this.maxSize });
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.logo = reader.result as string;
          this.logoChanged = true;
          this.formGroup.markAsDirty();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  public clearLogo() {
    // Clear
    this.logo = Constants.NO_IMAGE;
    this.logoChanged = true;
    this.formGroup.markAsDirty();
  }
}
