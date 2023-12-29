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
    sideMenu: "root.global.user",
    element: redirect(() => {
      ioc.routerService.push("/dashboard");
    }),
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
  if (path === "root.global.dashboard") {
    ioc.routerService.push("/dashboard");
  }

  if (path === "root.global.user") {
    ioc.routerService.push("/user");
  }
  if (path === "root.global.user.common") {
    ioc.routerService.push("/user_common");
  }
  if (path === "root.global.user.archive") {
    ioc.routerService.push("/user_archive");
  }

  if (path === "root.global.apartment") {
    ioc.routerService.push("/apartment");
  }
  if (path === "root.global.apartment.rent") {
    ioc.routerService.push("/apartment_rent");
  }
  if (path === "root.global.apartment.sell") {
    ioc.routerService.push("/apartment_sell");
  }
  if (path === "root.global.apartment.archive") {
    ioc.routerService.push("/apartment_archive");
  }
  if (path === "root.global.apartment.archive.archive") {
    ioc.routerService.push("/apartment_archive");
  }
  if (path === "root.global.apartment.archive.remove") {
    ioc.routerService.push("/apartment_remove");
  }

  if (path === "root.global.bid") {
    ioc.routerService.push("/bid");
  }
  if (path === "root.global.bid.rent") {
    ioc.routerService.push("/bid_rent");
  }
  if (path === "root.global.bid.sell") {
    ioc.routerService.push("/bid_sell");
  }
  if (path === "root.global.bid.archive") {
    ioc.routerService.push("/bid_archive");
  }

  if (path === "root.global.deal") {
    ioc.routerService.push("/deal");
  }
  if (path === "root.global.deal.all") {
    ioc.routerService.push("/deal_all");
  }
  if (path === "root.global.deal.mine") {
    ioc.routerService.push("/deal_mine");
  }

  if (path === "root.global.task") {
    ioc.routerService.push("/task");
  }
  if (path === "root.global.task.all") {
    ioc.routerService.push("/task_all");
  }
  if (path === "root.global.task.mine") {
    ioc.routerService.push("/task_mine");
  }

  if (path === "root.global.contact") {
    ioc.routerService.push("/contact");
  }

  if (path === "root.global.settings") {
    ioc.routerService.push("/settings");
  }
};

export default routes;
