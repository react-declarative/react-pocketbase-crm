import { MasterDetailMode, singleshot, singletick } from "react-declarative";
import SettingsDbService, { INITIAL_SETTINGS, ISettingsDto } from "../db/SettingsDbService";

import LoggerService from "../base/LoggerService";
import PocketbaseService from "../base/PocketbaseService";
import TYPES from "../../types";
import { inject } from "react-declarative";
import { makeObservable } from "mobx";

export class SettingsViewService {

    private readonly settingsDbService = inject<SettingsDbService>(TYPES.settingsDbService);
    private readonly loggerService = inject<LoggerService>(TYPES.loggerService);
    private readonly pocketbaseService = inject<PocketbaseService>(TYPES.pocketbaseService);

    public readonly updateSubject = this.settingsDbService.updateSubject;

    constructor() {
        makeObservable(this, {});
    }

    getValue = singleshot(async () => {
        this.loggerService.log('settingsViewService getValue');
        try {
            if (!this.pocketbaseService.isAuthorized) {
                return INITIAL_SETTINGS;
            }
            return await this.settingsDbService.read();
        } catch {
            return await this.settingsDbService.create();
        }
    });
    
    setValue = async (payload: ISettingsDto) => {
        this.loggerService.log('settingsViewService setValue', payload);
        return await this.settingsDbService.update(payload);
    };

};

export default SettingsViewService;
