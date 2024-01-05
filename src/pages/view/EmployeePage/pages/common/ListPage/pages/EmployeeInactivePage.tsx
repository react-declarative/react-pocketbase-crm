import {
  IOutletProps,
  List,
  SelectionMode,
  useQueryPagination,
} from "react-declarative";
import {
  actions,
  columns,
  filters,
  rowActions,
} from "../../../../../../../assets/employee_columns";

import { IEmployeeRow } from "../../../../../../../lib/services/db/EmployeeDbService";
import ioc from "../../../../../../../lib/ioc";
import useEmployeeListAction from "../../../../../../../hooks/useEmployeeListAction";
import useEmployeePaginator from "../../../../../../../api/useEmployeePaginator";

const heightRequest = () => window.innerHeight - 80;

export const EmployeeInactivePage = ({ payload }: IOutletProps) => {
  const { listProps } = useQueryPagination();

  const { commitRowAction, commitAction } = useEmployeeListAction({
    payload,
  });

  const handler = useEmployeePaginator();

  const handleRowClick = (row: IEmployeeRow) => {
    ioc.routerService.push(`/employee/${row.id}`);
  };

  return (
    <List
      withCustomFilters
      withSearch
      reloadSubject={ioc.employeeViewService.reloadSubject}
      title="Inactive employee"
      filterLabel="Context search"
      heightRequest={heightRequest}
      rowActions={rowActions}
      actions={actions}
      filters={filters}
      columns={columns}
      handler={handler}
      payload={() => ({
        ...payload,
        _active: true,
      })}
      onRowClick={handleRowClick}
      onRowAction={commitRowAction}
      onAction={commitAction}
      selectionMode={SelectionMode.Multiple}
      {...listProps}
    />
  );
};

export default EmployeeInactivePage;
