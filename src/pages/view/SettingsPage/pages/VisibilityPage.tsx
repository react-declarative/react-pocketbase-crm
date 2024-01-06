import {
  Breadcrumbs2,
  Breadcrumbs2Type,
  IBreadcrumbs2Option,
  IOutletProps,
  IVisibilityGroup,
  VisibilityView,
} from "react-declarative";

import Container from "@mui/material/Container";
import employee_fields from "../../../../assets/employee_fields";

const options: IBreadcrumbs2Option[] = [
  {
    type: Breadcrumbs2Type.Link,
    action: "list-action",
    label: "Settings",
  },
  {
    type: Breadcrumbs2Type.Link,
    action: "list-action",
    label: "Visibility",
  },
  {
    type: Breadcrumbs2Type.Button,
    isDisabled: ({ hasChanged }) => !hasChanged,
    action: "save-action",
    label: "Save",
  },
];

const groups: IVisibilityGroup[] = [
  {
    name: "employee",
    fields: employee_fields,
  },
];

export const VisibilityPage = ({
  beginSave,
  data,
  formState,
  onChange,
}: IOutletProps) => {
  const handleAction = (action: string) => {
    if (action === "save-action") {
      beginSave();
    }
  };
  return (
    <Container>
      <Breadcrumbs2
        items={options}
        onAction={handleAction}
        payload={formState}
      />
      <VisibilityView
        expandAll
        data={{ employee: data }}
        groups={groups}
        onChange={({ employee }) => onChange(employee)}
      />
    </Container>
  );
};

export default VisibilityPage;
