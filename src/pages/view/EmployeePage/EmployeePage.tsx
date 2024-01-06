import {
  FetchView,
  IOutlet,
  OutletView,
  getErrorMessage,
  trycatch,
  useSubject,
} from "react-declarative";

import HistoryPage from "./pages/HistoryPage";
import ListPage from "./pages/common/ListPage";
import OnePage from "./pages/OnePage";
import hasRouteMatch from "../../../utils/hasRouteMatch";
import ioc from "../../../lib/ioc";
import { useEffect } from "react";

interface IEmployeePageProps {
  id?: string;
}

const routes: IOutlet[] = [
  {
    id: "list",
    element: ListPage,
    isActive: (pathname) =>
      hasRouteMatch(["/employee_active", "/employee_inactive"], pathname),
    isAvailable: () => false,
  },
  {
    id: "employee",
    element: OnePage,
    isActive: (pathname) => {
      return hasRouteMatch(
        ["/employee/:id", "/employee/:id/employee"],
        pathname
      );
    },
  },
  {
    id: "history",
    element: HistoryPage,
    isActive: (pathname) =>
      hasRouteMatch(["/employee/:id/history"], pathname),
  },
];

export const EmployeePage = ({ id = "never" }: IEmployeePageProps) => {
  const handleSubmit = async (data: Record<string, any>) => {
    let isOk = true;
    try {
      await ioc.employeeViewService.update(id, data.employee);
      ioc.alertService.notify("Saved");
    } catch (error) {
      isOk = false;
      const msg = getErrorMessage(error);
      ioc.alertService.notify(msg);
    } finally {
      return isOk;
    }
  };

  const fetchState = async () => [
    await trycatch(ioc.employeeViewService.read)(id),
    await ioc.permissionService.getFeatures(),
    await ioc.permissionService.getVisibility(),
  ];

  const changeSubject = useSubject();

  useEffect(
    () =>
      ioc.employeeViewService.updateSubject.subscribe(([chunk_id, chunk]) => {
        if (id !== chunk_id) {
          return;
        }
        changeSubject.next(["employee", chunk]);
      }),
    []
  );

  return (
    <FetchView state={fetchState} fallback={ioc.errorService.handleGlobalError}>
      {async ([employee, features, visibility]) => (
        <OutletView
          changeSubject={changeSubject}
          history={ioc.routerService}
          onLoadStart={() => ioc.layoutService.setAppbarLoader(true)}
          onLoadEnd={() => ioc.layoutService.setAppbarLoader(false)}
          routes={routes}
          params={{ id }}
          initialData={{
            employee,
          }}
          payload={() => ({
            features,
            visibility,
            id,
          })}
          onChange={console.log}
          onSubmit={handleSubmit}
        />
      )}
    </FetchView>
  );
};

export default EmployeePage;
