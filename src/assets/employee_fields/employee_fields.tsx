import { FieldType, TypedField } from "react-declarative";

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
      },
    ],
  },
  {
    type: FieldType.Paper,
    fields: [
      {
        type: FieldType.Typography,
        typoVariant: "h6",
        placeholder: "Common info",
      },
      {
        type: FieldType.Text,
        columns: '3',
        name: 'first_name',
      },
      {
        type: FieldType.Text,
        columns: '3',
        name: 'last_name',
      },
      {
        type: FieldType.Text,
        columns: '3',
        name: 'email',
      },
      {
        type: FieldType.Text,
        columns: '3',
        inputFormatterAllowed: /^[0-9.]/,
        inputFormatterTemplate: "+000000000000000",
        name: 'phone',
      },
      {
        type: FieldType.Date,
        columns: '3',
        name: 'hire_date',
      },
    ],
  },
];

export default employee_fields;
