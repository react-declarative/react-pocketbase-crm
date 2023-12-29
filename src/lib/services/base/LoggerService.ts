import * as Sentry from "@sentry/react";

import { CC_APP_NAME, CC_SENTRY_DNS } from "../../../config/params";

import { makeObservable } from "mobx";
import { singleshot } from "react-declarative";

export class LoggerService {

    constructor() {
        makeObservable(this, {});
    }

    public error = (error: Error) => {
        console.error(error);
        if (CC_SENTRY_DNS) {
            Sentry.withScope(scope => {
                // scope.setExtra("user_id", this.appwriteService.currentUser.$id);
                // scope.setExtra("email", this.appwriteService.currentUser.email);
                Sentry.captureException(error);
            });
        }
    };

    public log = (msg: string, data?: Record<string, any>) => {
        console.log(msg, data);
        if (CC_SENTRY_DNS) {
            Sentry.withScope(scope => {
                // scope.setExtra("user_id", this.appwriteService.currentUser.$id);
                // scope.setExtra("email", this.appwriteService.currentUser.email);
                scope.setExtra("msg", msg);
                data && scope.setExtra("data", data);
                // Sentry.captureMessage(`Log for ${this.appwriteService.currentUser.email}`);
            });
        }
    };

    protected prefetch = singleshot(async () => {
        if (CC_SENTRY_DNS) {
            Sentry.init({
                dsn: CC_SENTRY_DNS,
                // attachStacktrace: false,
                // maxBreadcrumbs: 0,
                environment: CC_APP_NAME,
            });
        }

    });

};

export default LoggerService;
