import getRouteItem from "../../utils/getRouteItem";
import { locale } from "./locale";

function convert(str: string) {
  return locale[str] || str;
}

const routesMap: Record<string, Record<string, string>> = {
  "/login_page": {
    "Sign in": "Login",
  },
};

const getTranslateMap = () => {
  const item = getRouteItem();
  return routesMap[item?.path!] || {};
};

export function t(str: string) {
  const translateMap = getTranslateMap();
  return translateMap[str] || convert(str);
}

export default t;
