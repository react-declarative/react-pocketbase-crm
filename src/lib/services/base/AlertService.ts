import { makeAutoObservable } from "mobx";
import { v4 as randomString } from "uuid";

interface IAlert {
    key: string;
    message: string;
}

export class AlertService {
    
    private _alerts: IAlert[] = [];

    get current() {
        if (this._alerts.length) {
            return this._alerts[0];
        } else {
            return null;
        }
    };
    
    constructor() {
        makeAutoObservable(this);
    }
    
    hideCurrent = () => {
        if (this._alerts.length > 0) {
            this._alerts.shift();
        }
    };

    notify = (message: string) => {
        this.hideCurrent();
        this._alerts.push({
            key: randomString(),
            message, 
        });
    };

};

export default AlertService;
