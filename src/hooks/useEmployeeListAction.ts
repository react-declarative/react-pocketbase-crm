import ioc from "../lib/ioc";
import useEmployeeCreateModal from "../view/useEmployeeCreateModal";
import useEmployeePreviewModal from "../view/useEmployeePreviewModal";
import { useListAction } from "react-declarative";

interface IParams {
  payload: Record<string, any>;
}

export const useEmployeeListAction = ({
  payload,
}: IParams) => {

  const pickEmployeePreviewModal = useEmployeePreviewModal();
  const pickEmployeeCreateModal = useEmployeeCreateModal({ payload });

  return useListAction({
    fetchRow: async (id) => await ioc.employeeViewService.read(id as string),
    onRowAction: async (action, row, deselectAll) => {
      if (action === "toggle-active") {
        ioc.employeeViewService.toggleActive(row.id);
      }
      if (action === "open-preview") {
        pickEmployeePreviewModal(row.id);
      }
      deselectAll();
    },
    onAction: (action) => {
      if (action === "add-action") {
        pickEmployeeCreateModal();
      }
    },
    onLoadStart: () => ioc.layoutService.setAppbarLoader(true),
    onLoadEnd: () => ioc.layoutService.setAppbarLoader(false),
    fallback: ioc.errorService.handleGlobalError,
  });
};

export default useEmployeeListAction;
