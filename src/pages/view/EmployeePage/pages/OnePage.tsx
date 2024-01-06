import {
  Breadcrumbs2,
  Breadcrumbs2Type,
  IBreadcrumbs2Option,
  IOutletProps,
  One,
  ScrollAdjust,
} from "react-declarative";

import { Container } from "@mui/material";
import employee_fields from "../../../../assets/employee_fields";
import ioc from "../../../../lib/ioc";

const options: IBreadcrumbs2Option[] = [
  {
    type: Breadcrumbs2Type.Link,
    action: "list-action",
    label: "Employees",
  },
  {
    type: Breadcrumbs2Type.Link,
    action: "list-action",
    label: "Employee",
  },
  {
    type: Breadcrumbs2Type.Button,
    isDisabled: ({ hasChanged }) => !hasChanged,
    action: "save-action",
    label: "Save",
  },
];

export const OnePage = ({
  payload,
  onChange,
  formState,
  data,
  beginSave,
}: IOutletProps) => {
  const handleAction = (action: string) => {
    if (action === "list-action") {
      ioc.routerService.push('/employee_active');
    }
    if (action === "save-action") {
      beginSave();
    }
  };

  return (
    <Container>
      <Breadcrumbs2
        onAction={handleAction}
        items={options}
        payload={formState}
      />
      <One
        dirty
        handler={() => data}
        fields={employee_fields}
        payload={payload}
        features={payload.features}
        onChange={onChange}
      />
      <ScrollAdjust />
    </Container>
  );
};

export default OnePage;
