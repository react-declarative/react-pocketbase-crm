import {
  Scaffold2,
  Spinner,
  Switch,
  serviceManager,
  singleshot,
} from "react-declarative";
import { autorun, reaction } from "mobx";
import routes, {
  baseRoutes,
  handleOptionClick,
  handleTabClick,
} from "../../config/routes";
import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import { CC_APP_NAME } from "../../config/params";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Version from "./Version";
import getRouteItem from "../../utils/getRouteItem";
import hasRouteMatch from "../../utils/hasRouteMatch";
import ioc from "../../lib/ioc";
import { observer } from "mobx-react";
import scaffoldmenu from "../../config/scaffoldmenu";
import sidemenu from "../../config/sidemenu";

const Fragment = () => <></>;

const Loader = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      background: (theme) => theme.palette.background.paper,
    }}
  >
    <Spinner />
  </Box>
);

const handleInit = singleshot(async () => {
  await serviceManager.waitForProvide(true);
  await serviceManager.prefetch(true);
});

const handleLoadStart = () => {
  ioc.layoutService.setAppbarLoader(true);
};

const handleLoadEnd = () => {
  ioc.layoutService.setAppbarLoader(false);
};

const handleAction = async (action: string) => {
  if (action === "logout-action") {
    await ioc.pocketbaseService.logout();
  }
};

const BeforeMenuContent = observer(() => (
  <ListItem>
    <ListItemText
      primary={ioc.pocketbaseService.authModel.email}
      secondary={ioc.pocketbaseService.authModel.id}
    />
  </ListItem>
));

const App = () => {
  const [item, setItem] = useState(getRouteItem());
  const [pathname, setPathname] = useState(ioc.routerService.location.pathname);
  const [hasAppbarLoader, setHasAppbarLoader] = useState(
    ioc.layoutService.hasAppbarLoader
  );
  const [hasModalLoader, setHasModalLoader] = useState(
    ioc.layoutService.hasModalLoader
  );

  const noContent = useMemo(
    () => hasRouteMatch(baseRoutes.map(({ path }) => path)),
    [pathname]
  );

  useEffect(
    () =>
      reaction(
        () => ioc.routerService.location.pathname,
        () => {
          setItem(getRouteItem());
        }
      ),
    []
  );

  useEffect(
    () =>
      autorun(
        () => {
          setPathname(ioc.routerService.location.pathname);
        },
        { delay: 10 }
      ),
    []
  );

  useEffect(
    () =>
      autorun(
        () => {
          setHasAppbarLoader(ioc.layoutService.hasAppbarLoader);
        },
        { delay: 10 }
      ),
    []
  );

  useEffect(
    () =>
      autorun(() => {
        setHasModalLoader(ioc.layoutService.hasModalLoader);
      }),
    []
  );

  return (
    <>
      <Scaffold2
        fixedHeader
        noOptionHover
        noContent={noContent}
        appName={CC_APP_NAME}
        deps={[pathname]}
        activeOptionPath={item?.sideMenu || ""}
        loading={hasAppbarLoader}
        options={sidemenu}
        actions={scaffoldmenu}
        onOptionClick={handleOptionClick}
        onOptionGroupClick={handleOptionClick}
        onTabChange={handleTabClick}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onAction={handleAction}
        onInit={handleInit}
        BeforeMenuContent={BeforeMenuContent}
        AfterContent={Version}
      >
        <Switch
          Loader={Fragment}
          history={ioc.routerService}
          items={routes}
          fallback={ioc.errorService.handleGlobalError}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onInit={handleInit}
        />
      </Scaffold2>
      {hasModalLoader && <Loader />}
    </>
  );
};

export default App;
