import {
  Breadcrumbs2,
  Breadcrumbs2Type,
  FeatureView,
  IBreadcrumbs2Option,
  IFeatureGroup,
  IOutletProps,
} from "react-declarative";

import { Container } from "@mui/material";

const options: IBreadcrumbs2Option[] = [
  {
    type: Breadcrumbs2Type.Link,
    action: "list-action",
    label: "Settings",
  },
  {
    type: Breadcrumbs2Type.Link,
    action: "list-action",
    label: "Features",
  },
  {
    type: Breadcrumbs2Type.Button,
    isDisabled: ({ hasChanged }) => !hasChanged,
    action: "save-action",
    label: "Save",
  },
];

const features: IFeatureGroup[] = [
  {
    title: "Employee",
    expanded: true,
    children: [
      {
        name: "employee_preview_modal",
        label: "Employee preview modal",
        description: "Click on row open preview modal",
      },
      {
        name: "employee_toggle_inactive",
        label: "Employee toggle inactive",
        description: "Can toggle employee activity",
      },
    ],
  },
];

export const FeaturePage = ({
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
      <FeatureView
        expandAll
        data={data}
        features={features}
        onChange={onChange}
      />
    </Container>
  );
};

export default FeaturePage;
