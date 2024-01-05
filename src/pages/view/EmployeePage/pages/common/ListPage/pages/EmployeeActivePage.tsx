import {
  List,
  SelectionMode,
  useQueryPagination,
} from "react-declarative";
import { actions, columns, filters, rowActions } from "../../../../../../../assets/employee_columns";

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
      onRowAction={commitRowAction}
      selectionMode={SelectionMode.Multiple}
      {...listProps}
    />
  );
});

export default MainListPage;
