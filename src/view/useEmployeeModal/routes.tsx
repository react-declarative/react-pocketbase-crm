import { BrowserHistory, HashHistory, MemoryHistory } from "history";

import DataView from "./view/DataView";
import HistoryView from "./view/HistoryView";
import { IOutlet } from "react-declarative";

const hasMatch = (templates: string[], pathname: string) => {
  return templates.some((template) => template.includes(pathname));
};

export const getCurrentId = (
  history: MemoryHistory | BrowserHistory | HashHistory
) => {
  return (
    routes.find(({ isActive }) => isActive(history.location.pathname))?.id ||
    "object"
  );
};

export const routes: IOutlet[] = [
  {
    id: "employee",
    element: DataView,
    isActive: (pathname) => hasMatch(["/employee/employee"], pathname),
  },
  {
    id: "history",
    element: HistoryView,
    isActive: (pathname) => {
      console.log(pathname);
      return hasMatch(["/employee/history"], pathname);
    },
  },
];

export default routes;
