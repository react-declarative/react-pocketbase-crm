import { ActionType, ColumnType, Copy, IColumn, IListAction, IListRowAction } from "react-declarative";

import { ArrowForward } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { IEmployeeRow } from "../../lib/services/db/EmployeeDbService";
import employee_fields from "../employee_fields";
import ioc from "../../lib/ioc";

export const columns: IColumn<IEmployeeRow>[] = [
  {
    type: ColumnType.Compute,
    sortable: false,
    field: "id",
    headerName: "ID",
    secondary: true,
    element: ({ id }) => (
      <Copy
        content={id}
        onCopyClick={() => ioc.alertService.notify("Successfully copied")}
      />
    ),
    width: (fullWidth) => Math.max((fullWidth - 100) / 3, 125),
  },
  {
    type: ColumnType.Compute,
    headerName: "Display name",
    compute: ({ first_name, last_name }) => [first_name, last_name].join(" "),
    width: (fullWidth) => Math.max((fullWidth - 100) / 3, 125),
  },
  {
    type: ColumnType.Text,
    sortable: false,
    headerName: "Email",
    field: "email",
    width: (fullWidth) => Math.max((fullWidth - 100) / 3, 125),
  },
  {
    type: ColumnType.Action,
    headerName: "Actions",
    sortable: false,
    width: () => 100,
  },
];

export const actions: IListAction[] = [
  {
    type: ActionType.Add,
    action: "add-action",
  },
  {
    type: ActionType.Menu,
    options: [
      {
        action: "add-action",
      },
      {
        action: "update-now",
      },
      {
        action: "resort-action",
      },
      {
        action: "drop-filters",
      },
    ],
  },
];

export const rowActions: IListRowAction[] = [
  {
    label: "Open preview",
    action: "open-preview",
    isDisabled: (row, { features }) => !features.has("employee_preview_modal"),
    icon: ArrowForward,
  },
  {
    label: "Active",
    action: "toggle-active",
    icon: CheckBoxOutlineBlankIcon,
    isDisabled: (row, { features }) => !features.has("employee_toggle_inactive"),
    isVisible: (row) => !row.is_active,
  },
  {
    label: "Active",
    action: "toggle-active",
    icon: CheckBoxIcon,
    isDisabled: (row, { features }) => !features.has("employee_toggle_inactive"),
    isVisible: ({ is_active }) => !!is_active,
  },
];

export const filters = employee_fields;
