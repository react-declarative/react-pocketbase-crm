import EmployeePage from "../pages/view/EmployeePage/EmployeePage";
import ErrorPage from "../pages/base/ErrorPage";
import { ISwitchItem } from "react-declarative";
import LoginPage from "../pages/base/LoginPage";
import getRouteParams from "../utils/getRouteParams";
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
  ...baseRoutes,
];

export const handleTabClick = (path: string) => {
  const params = getRouteParams();
  console.log({ path });
  if (path === "root.global.settings.common") {
    ioc.routerService.push(`/settings/common`);
  }
  if (path === "root.global.settings.roles") {
    ioc.routerService.push(`/settings/roles`);
  }
  if (path === "root.global.settings.integration") {
    ioc.routerService.push(`/settings/integration`);
  }
  if (path === "root.global.settings.field_visibility") {
    ioc.routerService.push(`/settings/field_visibility`);
  }
  if (path === "root.global.settings.autofind_config") {
    ioc.routerService.push(`/settings/autofind_config`);
  }
  if (path === "root.global.settings.export_data") {
    ioc.routerService.push(`/settings/export_data`);
  }
};

export const handleOptionClick = (path: string) => {
  if (path === "root.data.employee.active") {
    ioc.routerService.push("/employee_active");
  }
  if (path === "root.data.employee.inactive") {
    ioc.routerService.push("/employee_inactive");
  }
};

export default routes;
