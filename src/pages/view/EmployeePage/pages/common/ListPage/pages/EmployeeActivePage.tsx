import {
  List,
  SelectionMode,
  useQueryPagination,
} from "react-declarative";
import { actions, columns, filters, rowActions } from "../../../../../../../assets/employee_columns";

import { IEmployeeRow } from "../../../../../../../lib/services/db/EmployeeDbService";
import ioc from "../../../../../../../lib/ioc";
import { observer } from "mobx-react";
import useEmployeeListAction from "../../../../../../../hooks/useEmployeeListAction";
import useEmployeePaginator from "../../../../../../../api/useEmployeePaginator";

const heightRequest = () => window.innerHeight - 80;

export const MainListPage = observer(() => {
  const { listProps } = useQueryPagination();

  const {
    commitRowAction,
  } = useEmployeeListAction();

  const handler = useEmployeePaginator();

  const handleRowClick = (row: IEmployeeRow) => {
    ioc.routerService.push(`/employee/${row.id}`);
  };

  return (
    <List
      withCustomFilters
      withSearch
      reloadSubject={ioc.employeeViewService.reloadSubject}
      title="Active employee"
      filterLabel="Filters"
      heightRequest={heightRequest}
      rowActions={rowActions}
      actions={actions}
      filters={filters}
      columns={columns}
      handler={handler}
      onRowClick={handleRowClick}
      onRowAction={commitRowAction}
      selectionMode={SelectionMode.Multiple}
      {...listProps}
    />
  );
});

export default MainListPage;
