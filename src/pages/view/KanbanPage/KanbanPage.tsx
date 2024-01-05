import { FetchView, IOutlet, OutletView } from "react-declarative";

import MainPage from "./pages/MainPage";
import hasRouteMatch from "../../../utils/hasRouteMatch";
import ioc from "../../../lib/ioc";

const routes: IOutlet[] = [
  {
    id: "employees",
    element: MainPage,
    isActive: (pathname) => hasRouteMatch(["/kanban"], pathname),
    isAvailable: () => false,
  },
];

export const KanbanPage = () => {
  const fetchState = async () =>
    [
      await ioc.employeeViewService.findAll(),
    ] as const;

  return (
    <FetchView
      state={fetchState}
      fallback={ioc.errorService.handleGlobalError}
    >
      {async ([employees]) => (
        <OutletView
          history={ioc.routerService}
          routes={routes}
          initialData={{
            employees,
          }}
          payload={() => ({
            // permissions,
          })}
        />
      )}
    </FetchView>
  );
};

export default KanbanPage;
