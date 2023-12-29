import ErrorPage from "../pages/base/ErrorPage";
import { ISwitchItem } from "react-declarative";
import LoginPage from "../pages/base/LoginPage";
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
    sideMenu: "root.global.user",
    element: redirect(() => {
      ioc.routerService.push("/dashboard");
    }),
  },
  ...baseRoutes,
];

export default routes;
