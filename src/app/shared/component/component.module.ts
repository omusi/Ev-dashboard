import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../../app.module';
import { CommonDirectivesModule } from '../directives/directives.module';
import { FormattersModule } from '../formatters/formatters.module';
import { ChartUnitSelectorComponent } from './consumption-chart/chart-unit-selector.component';
import { ConsumptionChartDetailComponent } from './consumption-chart/consumption-chart-detail.component';
import { ConsumptionChartComponent } from './consumption-chart/consumption-chart.component';
import { DateTimeRangeComponent } from './date-time-range/date-time-range.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { EcowattGridForecastCellComponent } from './grid-monitoring/ecowatt/ecowatt-grid-forecast-cell-component';
import { EcowattGridStatusCellComponent } from './grid-monitoring/ecowatt/ecowatt-grid-status-cell-component';
import { GridForecastCellComponent } from './grid-monitoring/grid-forecast-cell.component';
import { GridStatusCellComponent } from './grid-monitoring/grid-status-cell.component';
import { RefreshComponent } from './refresh/refresh.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CommonDirectivesModule,
    FormattersModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [
    ConsumptionChartDetailComponent,
    ConsumptionChartComponent,
    ChartUnitSelectorComponent,
    RefreshComponent,
    DateTimeComponent,
    DateTimeRangeComponent,
    GridStatusCellComponent,
    GridForecastCellComponent,
    EcowattGridStatusCellComponent,
    EcowattGridForecastCellComponent,
  ],
  exports: [
    ConsumptionChartComponent,
    ChartUnitSelectorComponent,
    RefreshComponent,
    DateTimeComponent,
    DateTimeRangeComponent,
  ],
})
export class ComponentModule {
}
