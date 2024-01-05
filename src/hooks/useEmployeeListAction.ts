import ioc from "../lib/ioc";
import useEmployeeModal from "../view/useEmployeeModal";
import { useListAction } from "react-declarative";

export const useEmployeeListAction = () => {

  const pickEmployeeModal = useEmployeeModal();

  return useListAction({
    fetchRow: async (id) => await ioc.employeeViewService.read(id as string),
    onRowAction: async (action, row, deselectAll) => {
      if (action === "toggle-active") {
        ioc.employeeViewService.toggleActive(row.id);
      }
      if (action === "open-preview") {
        pickEmployeeModal(row.id);
      }
      deselectAll();
    },
    onLoadStart: () => ioc.layoutService.setAppbarLoader(true),
    onLoadEnd: () => ioc.layoutService.setAppbarLoader(false),
    fallback: ioc.errorService.handleGlobalError,
  });
};

export default useEmployeeListAction;
