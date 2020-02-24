import { Component, Input } from '@angular/core';
import { CellContentTemplateComponent } from 'app/shared/table/cell-content-template/cell-content-template.component';
import { Building } from 'app/types/Building';

@Component({
  template: `
    <div class="logo-container">
      <img *ngIf="row.logo" class="app-companies-logo" [src]='row.logo'>
    </div>
  `,
})

export class BuildingLogoFormatterComponent extends CellContentTemplateComponent {
  @Input() row!: Building;
}
