import { IOutlet, IOutletProps, OutletView } from "react-declarative";

import EmployeeActivePage from "./pages/EmployeeActivePage";
import EmployeeInactivePage from "./pages/EmployeeInactivePage";
import hasRouteMatch from "../../../../../../utils/hasRouteMatch";
import ioc from "../../../../../../lib/ioc";

const routes: IOutlet[] = [
  {
    id: "employee_active",
    element: EmployeeActivePage,
    isActive: (pathname) => hasRouteMatch(["/employee_active"], pathname),
    isAvailable: () => false,
  },
  {
    id: "employee_inactive",
    element: EmployeeInactivePage,
    isActive: (pathname) => hasRouteMatch(["/employee_inactive"], pathname),
    isAvailable: () => false,
  },
];

export const ListPage = ({ payload }: IOutletProps) => (
  <OutletView
    history={ioc.routerService}
    onLoadStart={() => ioc.layoutService.setAppbarLoader(true)}
    onLoadEnd={() => ioc.layoutService.setAppbarLoader(false)}
    routes={routes}
    payload={payload}
  />
);

export default ListPage;
