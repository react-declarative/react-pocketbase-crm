import getRouteParams, { getRouteParam } from "../utils/getRouteParams";

import EmployeePage from "../pages/view/EmployeePage/EmployeePage";
import ErrorPage from "../pages/base/ErrorPage";
import { ISwitchItem } from "react-declarative";
import KanbanPage from "../pages/view/KanbanPage";
import LoginPage from "../pages/base/LoginPage";
import SettingsPage from "../pages/view/SettingsPage";
import heavy from "../components/hoc/heavy";
import ioc from "../lib/ioc";
import redirect from "../components/hoc/redirect";

export interface IRouteItem extends ISwitchItem {
  sideMenu?: string;
}

export const baseRoutes: IRouteItem[] = [
  {
    path: "/error_page",
    element: ErrorPage,
  },
  {
    path: "/login_page",
    element: LoginPage,
  },
];

export const routes: IRouteItem[] = [
  {
    path: "/",
    sideMenu: "root.data.employee.active",
    element: redirect(() => {
      ioc.routerService.push("/employee_active");
    }),
  },

  {
    path: "/kanban",
    sideMenu: "root.data.kanban",
    element: KanbanPage,
  },
  {
    path: "/employee/:id/history",
    sideMenu: "root.data.employee",
    element: EmployeePage,
  },
  {
    path: "/employee/:id/employee",
    sideMenu: "root.data.employee",
    element: EmployeePage,
  },
  {
    path: "/employee/:id",
    sideMenu: "root.data.employee",
    element: EmployeePage,
  },
  {
    path: "/employee_active",
    sideMenu: "root.data.employee.active",
    element: EmployeePage,
  },
  {
    path: "/employee_inactive",
    sideMenu: "root.data.employee.inactive",
    element: EmployeePage,
  },
  {
    path: "/settings",
    sideMenu: "root.application.settings",
    element: SettingsPage,
  },
  {
    path: "/settings/features",
    sideMenu: "root.application.settings",
    element: SettingsPage,
  },
  {
    path: "/settings/visibility",
    sideMenu: "root.application.settings",
    element: SettingsPage,
  },
  ...baseRoutes,
];

/**
 * @description `<OutletView />` will catch history replace so last form changes wont be loose
 */
export const handleTabClick = (path: string) => {
  const id = getRouteParam("id", null);
  if (path === "root.data.employee.data") {
    ioc.routerService.replace(`/employee/${id}/employee`);
  }
  if (path === "root.data.employee.history") {
    ioc.routerService.replace(`/employee/${id}/history`);
  }

  if (path === "root.application.settings.features") {
    ioc.routerService.replace(`/settings/features`);
  }
  if (path === "root.application.settings.visibility") {
    ioc.routerService.replace(`/settings/visibility`);
  }
};

export const handleOptionClick = (path: string) => {
  if (path === "root.data.kanban") {
    ioc.routerService.push("/kanban");
  }

  if (path === "root.application.settings") {
    ioc.routerService.push("/settings");
  }

  if (path === "root.data.employee") {
    ioc.routerService.push("/employee_active");
  }
  if (path === "root.data.employee.active") {
    ioc.routerService.push("/employee_active");
  }
  if (path === "root.data.employee.inactive") {
    ioc.routerService.push("/employee_inactive");
  }
};

export default routes;
