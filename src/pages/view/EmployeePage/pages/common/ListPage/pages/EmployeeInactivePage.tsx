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
import useEmployeePreviewModal from "../../../../../../../view/useEmployeePreviewModal";

const heightRequest = () => window.innerHeight - 80;

export const EmployeeInactivePage = ({ payload }: IOutletProps) => {
  const { listProps } = useQueryPagination();

  const pickEmployeePreviewModal = useEmployeePreviewModal();

  const { commitRowAction, commitAction } = useEmployeeListAction({
    payload,
  });

  const handler = useEmployeePaginator();

  const handleRowClick = async (row: IEmployeeRow) => {
    const features = await ioc.permissionService.getFeatures();
    if (features.has("employee_preview_modal")) {
      pickEmployeePreviewModal(row.id);
      return;
    }
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
        _inactive: true,
        _filters: true,
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
