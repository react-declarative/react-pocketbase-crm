import { ITimeSlot, datetime } from "react-declarative";
import { TimePicker, TimeView } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import { useMemo } from "react";

const DATE_VIEWS: TimeView[] = ["hours", "minutes", "seconds"];

export const TimeSlot = ({
  invalid,
  value,
  disabled,
  description = "",
  outlined = true,
  title = "Text",
  labelShrink,
  dirty,
  autoFocus,
  inputRef,
  onChange,
  name,
}: ITimeSlot) => {
  const dayjsValue = useMemo(() => {
    if (value) {
      const date = datetime.parseTime(value);
      if (!date) {
        return undefined;
      }
      let now = dayjs();
      now = now.set("hour", date.hour);
      now = now.set("minute", date.minute);
      return now;
    }
    return undefined;
  }, [value]);

  return (
    <TimePicker
      label={title}
      value={dayjsValue}
      views={DATE_VIEWS}
      onChange={(value: dayjs.Dayjs | null) => {
        if (value) {
          const hour = value.get("hour");
          const minute = value.get("minute");
          onChange(new datetime.Time(hour, minute).toString());
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

export default TimeSlot;
