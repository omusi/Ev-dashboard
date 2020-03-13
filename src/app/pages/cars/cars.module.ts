import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../app.module';
import { DialogsModule } from '../../shared/dialogs/dialogs.module';
import { TableModule } from '../../shared/table/table.module';
import { CarsComponent } from './cars.component';
import { CarsRoutes } from './cars.routing';
import { CarsListComponent } from './list/cars-list.component';
import { CarImageFormatterCellComponent } from './cell-components/car-image-formatter-cell.component';
import { CarDialogComponent } from 'app/shared/dialogs/cars/car-dialog.component';
import { CarObjectComponent } from './car/car-object.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    TableModule,
    DialogsModule,
    RouterModule.forChild(CarsRoutes),
  ],
  declarations: [
    CarouselComponent,
    CarObjectComponent,
    CarImageFormatterCellComponent,
    CarDialogComponent,
    CarsComponent,
    CarsListComponent,
  ],
  entryComponents: [
    CarObjectComponent,
    CarDialogComponent,
    CarImageFormatterCellComponent,
    CarsComponent,
    CarsListComponent,
  ],
  providers: [
  ],
})

export class CarsModule {
}
