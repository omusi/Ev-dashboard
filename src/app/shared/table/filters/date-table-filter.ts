import * as dayjs from 'dayjs';

import { FilterType, TableFilterDef } from '../../../types/Table';
import { TableFilter } from './table-filter';

export class DateTableFilter extends TableFilter {
  public constructor() {
    super();
    // Define filter
    const filterDef: TableFilterDef = {
      id: 'timestamp',
      httpID: 'Date',
      dateRangeTableFilterDef: {
        timePicker: false,
        timePickerSeconds: false,
        displayRanges: false,
      },
      type: FilterType.DATE,
      name: 'general.search_date',
      currentValue: dayjs().startOf('day').toDate(),
      reset: () => filterDef.currentValue = dayjs().startOf('day').toDate(),
    };
    // Set
    this.setFilterDef(filterDef);
  }
}
