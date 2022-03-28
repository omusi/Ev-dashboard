import { Component, Input } from '@angular/core';

import { CellContentTemplateDirective } from '../../../shared/table/cell-content-template/cell-content-template.directive';
import { Car, CarCatalog } from '../../../types/Car';

@Component({
  template: `
    <div class="logo-container">
      <img class="app-car-image"
        [src]="row['carCatalog'] ? row['carCatalog']['image'] : row['image']" alt="">
    </div>
  `,
})

export class CarImageFormatterCellComponent extends CellContentTemplateDirective {
  @Input() public row!: CarCatalog | Car;
}
