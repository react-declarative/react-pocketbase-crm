import { LoaderView } from "react-declarative";
import ioc from "../../lib/ioc";

export const redirect = (handler: () => void) => () => (
  <LoaderView
    handler={async () => {
      if (!ioc.pocketbaseService.isAuthorized) {
        ioc.routerService.push("/login_page");
        return;
      }
      await handler();
    }}
    height="calc(100vh - 80px)"
  />
);

export default redirect;
