import { LogActionsDialogComponent } from '../../../shared/dialogs/logs/log-actions-dialog.component';
import { TableFilter } from '../../../shared/table/filters/table-filter';
import { FilterType, TableFilterDef } from '../../../types/Table';

export class LogActionTableFilter extends TableFilter {
  public constructor(actions?: readonly string[]) {
    super();
    // Define filter
    const filterDef: TableFilterDef = {
      id: 'action',
      httpID: 'Action',
      type: FilterType.DIALOG_TABLE,
      defaultValue: '',
      label: '',
      name: 'logs.actions',
      dialogComponent: LogActionsDialogComponent,
      multiple: true,
      cleared: true,
    };

    if (actions) {
      filterDef.dialogComponentData = {
        staticFilter: {
          Action: actions.join('|'),
        },
      };
    }
    // Set
    this.setFilterDef(filterDef);
  }
}
