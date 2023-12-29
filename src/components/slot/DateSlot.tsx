import { DatePicker, DateView } from "@mui/x-date-pickers";
import { IDateSlot, datetime } from "react-declarative";

import dayjs from "dayjs";
import { useMemo } from "react";

const DATE_VIEWS: DateView[] = ["day", "month", "year"];

export const DateSlot = ({
  invalid,
  value,
  disabled,
  readonly,
  description = "",
  outlined = true,
  title = "Text",
  labelShrink,
  dirty,
  autoFocus,
  inputRef,
  onChange,
  name,
}: IDateSlot) => {
  const dayjsValue = useMemo(() => {
    if (value) {
      const date = datetime.parseDate(value);
      if (!date) {
        return undefined;
      }
      let now = dayjs();
      now = now.set("date", date.day);
      now = now.set("month", date.month - 1);
      now = now.set("year", date.year);
      return now;
    }
    return undefined;
  }, [value]);

  return (
    <DatePicker
      label={title}
      value={dayjsValue}
      views={DATE_VIEWS}
      onChange={(value: dayjs.Dayjs | null) => {
        if (value) {
          const day = value.get("date");
          const month = value.get("month") + 1;
          const year = value.get("year");
          onChange(new datetime.Date(day, month, year).toString());
          return;
        }
        onChange(null);
      }}
      slotProps={{
        textField: {
          inputRef,
          InputLabelProps: labelShrink
            ? {
                shrink: labelShrink,
              }
            : undefined,
          disabled,
          focused: autoFocus,
          variant: outlined ? "outlined" : "standard",
          label: title,
          name,
          helperText: (dirty && invalid) || description,
          error: dirty && invalid !== null,
        },
      }}
    />
  );
};

export default DateSlot;
