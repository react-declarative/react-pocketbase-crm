import {
  getErrorMessage,
  useActionModal,
  useModalManager,
} from "react-declarative";

import { Close } from "@mui/icons-material";
import { IEmployeeDto } from "../../lib/services/db/EmployeeDbService";
import IconButton from "@mui/material/IconButton";
import employee_fields from "../../assets/employee_fields";
import ioc from "../../lib/ioc";
import { useEffect } from "react";

interface IParams {
  payload: Record<string, any>;
}

const Bootstrap = ({ payload }: IParams) => {
  const { pop } = useModalManager();

  const { render, pickData } = useActionModal<IEmployeeDto>({
    AfterTitle: ({ onClose }) => (
      <IconButton size="small" onClick={onClose}>
        <Close />
      </IconButton>
    ),
    fields: employee_fields,
    payload,
    features: payload.permissions,
    outlinePaper: true,
    fullScreen: true,
    title: "Employee creation",
    onLoadStart: () => ioc.layoutService.setAppbarLoader(true),
    onLoadEnd: () => ioc.layoutService.setAppbarLoader(false),
    onClose: () => {
      pop();
    },
    onSubmit: async (data) => {
      let isOk = true;
      try {
        if (data) {
          const { id } = await ioc.employeeViewService.create({
            ...data,
            is_active: true,
          });
          ioc.routerService.push(`/employee/${id}`);
        }
        return true;
      } catch (error) {
        isOk = false;
        const msg = getErrorMessage(error);
        ioc.alertService.notify(msg);
        return false;
      } finally {
        return isOk;
      }
    },
    submitLabel: "Create",
  });

  useEffect(() => {
    pickData();
  }, []);

  return render();
};

export const useEmployeeCreateModal = ({ payload }: IParams) => {
  const { push } = useModalManager();
  return () => {
    push({
      id: "employee",
      render: () => <Bootstrap payload={payload} />,
    });
  };
};

export default useEmployeeCreateModal;
