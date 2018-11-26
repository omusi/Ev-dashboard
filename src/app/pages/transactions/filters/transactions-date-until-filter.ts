import {DateTableFilter} from '../../../shared/table/filters/date-filter';

export class TransactionsDateUntilFilter extends DateTableFilter {
  constructor() {
    super();
    const filter = this.getFilterDef();
    filter.id = 'dateUntil';
    filter.httpId = 'EndDateTime';
    filter.name = 'general.search_date_until';
    filter.currentValue = null;
  }
}
