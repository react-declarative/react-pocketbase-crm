import { FetchView, IOutlet, OutletView, getErrorMessage } from "react-declarative";

import FeaturePage from "./pages/FeaturePage";
import { ISettingsDto } from "../../../lib/services/db/SettingsDbService";
import VisibilityPage from "./pages/VisibilityPage";
import hasRouteMatch from "../../../utils/hasRouteMatch";
import ioc from "../../../lib/ioc";

const routes: IOutlet[] = [
  {
    id: "features",
    element: FeaturePage,
    isActive: (pathname) => hasRouteMatch(["/settings", "/settings/features"], pathname),
  },
  {
    id: "visibility",
    element: VisibilityPage,
    isActive: (pathname) => hasRouteMatch(["/settings/visibility"], pathname),
  },
];

export const SettingsPage = () => {
  const handleSubmit = async (data: ISettingsDto) => {
    let isOk = true;
    try {
      await ioc.settingsViewService.setValue(data);
      ioc.alertService.notify("Saved");
    } catch (error) {
      isOk = false;
      const msg = getErrorMessage(error);
      ioc.alertService.notify(msg);
    } finally {
      return isOk;
    }
  };

  const fetchState = async () =>
    [
      await ioc.settingsViewService.getValue(),
    ] as const;

  return (
    <FetchView
      state={fetchState}
      fallback={ioc.errorService.handleGlobalError}
    >
      {async ([settings]) => (
        <OutletView
          history={ioc.routerService}
          onLoadStart={() => ioc.layoutService.setAppbarLoader(true)}
          onLoadEnd={() => ioc.layoutService.setAppbarLoader(false)}
          routes={routes}
          initialData={{
            features: settings.features || null,
            visibility: settings.visibility || null,
          }}
          onSubmit={handleSubmit}
        />
      )}
    </FetchView>
  );
};

export default SettingsPage;
