import { FieldType, TypedField } from "react-declarative";

import hasAny from "../../utils/hasAny";

export const employee_fields: TypedField[] = [
  {
    type: FieldType.Paper,
    fieldBottomMargin: "1",
    fields: [
      {
        type: FieldType.Typography,
        typoVariant: "h6",
        placeholder: "Employee status",
      },
      {
        type: FieldType.Combo,
        columns: '6',
        name: "status",
        itemList: ["New contact", "Signing contract", "Working", "Retired"],
        defaultValue: ({ _filters }) => _filters ? null : "New contact",
      },
    ],
  },
  {
    type: FieldType.Paper,
    isVisible: (data, { visibility }) => {
      return hasAny(visibility, "first_name", "last_name", "email", "phone", "hire_date");
    },
    fields: [
      {
        type: FieldType.Typography,
        typoVariant: "h6",
        placeholder: "Common info",
      },
      {
        type: FieldType.Text,
        hidden: ({ visibility }) => !visibility.has("first_name"),
        isInvalid: ({ first_name }, { _filters }) => {
          if (_filters) {
            return null;
          }
          if (!first_name) {
            return "Required";
          }
          return null;
        },
        columns: '3',
        name: 'first_name',
      },
      {
        type: FieldType.Text,
        hidden: ({ visibility }) => !visibility.has("last_name"),
        isInvalid: ({ last_name }, { _filters }) => {
          if (_filters) {
            return null;
          }
          if (!last_name) {
            return "Required";
          }
          return null;
        },
        columns: '3',
        name: 'last_name',
      },
      {
        type: FieldType.Text,
        hidden: ({ visibility }) => !visibility.has("email"),
        columns: '3',
        name: 'email',
      },
      {
        type: FieldType.Text,
        hidden: ({ visibility }) => !visibility.has("phone"),
        columns: '3',
        inputFormatterAllowed: /^[0-9.]/,
        inputFormatterTemplate: "+000000000000000",
        name: 'phone',
      },
      {
        type: FieldType.Date,
        hidden: ({ visibility }) => !visibility.has("hire_date"),
        columns: '3',
        name: 'hire_date',
      },
    ],
  },
];

export default employee_fields;
