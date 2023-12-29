import dayjs from "dayjs";
import enLocale from "dayjs/locale/en-gb";
import isToday from "dayjs/plugin/isToday";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(isToday);

dayjs.locale(enLocale);
