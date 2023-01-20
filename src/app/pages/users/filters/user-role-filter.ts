import { CentralServerService } from '../../../services/central-server.service';
import { UserRoles } from '../../../shared/model/users.model';
import { TableFilter } from '../../../shared/table/filters/table-filter';
import { FilterType, TableFilterDef } from '../../../types/Table';

export class UserRoleFilter extends TableFilter {
  public constructor(
    private centralServerService: CentralServerService) {
    super();
    const items = UserRoles.getAvailableRoles(this.centralServerService.getLoggedUser().role);
    // Define filter
    const filterDef: TableFilterDef = {
      id: 'role',
      httpID: 'Role',
      type: FilterType.DROPDOWN,
      name: 'users.roles',
      label: '',
      currentValue: [],
      items: items ? items : undefined,
      multiple: true,
    };
    this.setFilterDef(filterDef);
  }
}
