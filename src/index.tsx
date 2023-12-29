import "./config/polyfills";
import "./config/dayjs";
import "./i18n";

import {
  ListSlotFactory,
  ModalFilterListSlot,
  ModalManagerProvider,
  ModalProvider,
  OneConfig,
  OneSlotFactory,
  ScrollAdjust,
  sleep,
} from "react-declarative";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AlertProvider from "./components/provider/AlertProvider";
import App from "./components/common/App";
import { CacheProvider } from "@emotion/react";
import ComboSlot from "./components/slot/ComboSlot";
import DateSlot from "./components/slot/DateSlot";
import { ErrorBoundary } from "react-declarative";
import LayoutProvider from "./components/provider/LayoutProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import THEME_DARK from "./config/theme";
import { ThemeProvider } from "@mui/material/styles";
import TimeSlot from "./components/slot/TimeSlot";
import { TssCacheProvider } from "tss-react";
import createCache from "@emotion/cache";
import { createRoot } from "react-dom/client";
import ioc from "./lib/ioc";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw-cache.js");
}

const container = document.getElementById("root")!;

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const tssCache = createCache({
  key: "tss",
});

const wrappedApp = (
  <ErrorBoundary
    history={ioc.routerService}
    onError={ioc.errorService.handleGlobalError}
  >
    <CacheProvider value={muiCache}>
      <TssCacheProvider value={tssCache}>
        <ThemeProvider theme={THEME_DARK}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <OneSlotFactory Combo={ComboSlot} Date={DateSlot} Time={TimeSlot}>
              <ListSlotFactory FilterListSlot={ModalFilterListSlot}>
                <ModalProvider>
                  <ModalManagerProvider>
                    <LayoutProvider>
                      <AlertProvider>
                        <App />
                      </AlertProvider>
                    </LayoutProvider>
                  </ModalManagerProvider>
                </ModalProvider>
              </ListSlotFactory>
            </OneSlotFactory>
          </LocalizationProvider>
        </ThemeProvider>
      </TssCacheProvider>
    </CacheProvider>
  </ErrorBoundary>
);

const root = createRoot(container);

OneConfig.setValue({
  WITH_DIRTY_CLICK_LISTENER: true,
  WITH_MOBILE_READONLY_FALLBACK: true,
  WITH_WAIT_FOR_MOVE_LISTENER: true,
  WITH_WAIT_FOR_TOUCH_LISTENER: true,
  WITH_DISMOUNT_LISTENER: true,
  WITH_SYNC_COMPUTE: true,
  CUSTOM_FIELD_DEBOUNCE: 800,
  FIELD_BLUR_DEBOUNCE: 50,
});

ScrollAdjust.setAdjustHeight(25);

const init = async () => {
  while (!window.Translate) {
    await sleep(500);
  }
  root.render(wrappedApp);
};

document.addEventListener("wheel", () => {
  const activeElement = document.activeElement as HTMLInputElement;
  if (activeElement && activeElement.type === "number") {
    activeElement.blur();
  }
});

init();
