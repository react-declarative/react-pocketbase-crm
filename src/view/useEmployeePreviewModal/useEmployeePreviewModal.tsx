import { useModalManager, useOutletModal } from "react-declarative";

import { Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { createMemoryHistory } from "history";
import ioc from "../../lib/ioc";
import routes from "./routes";

const DEFAULT_PATH = "/employee/employee";

const history = createMemoryHistory();

export const useEmployeePreviewModal = () => {
  const { push, pop } = useModalManager();

  const { pickData, render } = useOutletModal({
    history,
    withActionButton: true,
    withStaticAction: true,
    animation: "none",
    title: "Preview",
    pathname: "/apartment/object",
    routes,
    AfterTitle: ({ onClose }) => (
      <IconButton size="small" onClick={onClose}>
        <Close />
      </IconButton>
    ),
    fetchState: async (id) => [
      await ioc.employeeViewService.read(id),
      await ioc.permissionService.getFeatures(),
      await ioc.permissionService.getVisibility(),
    ],
    mapInitialData: (_, [employee]) => ({
      employee,
    }),
    mapPayload: (id, [, features, visibility]) => ({
      id,
      features,
      visibility,
    }),
    onLoadStart: () => ioc.layoutService.setAppbarLoader(true),
    onLoadEnd: () => ioc.layoutService.setAppbarLoader(false),
    onSubmit: (id, data) => {
      if (data) {
        ioc.routerService.push(`/employee/${id}`);
      }
      return true;
    },
    onClose: () => {
      pop();
    },
    submitLabel: "Open",
  });

  return (id: string) => {
    push({
      id: "employee",
      render,
      onInit: () => {
        history.push(DEFAULT_PATH);
      },
      onMount: () => {
        pickData(id);
      },
    });
  };
};

export default useEmployeePreviewModal;
