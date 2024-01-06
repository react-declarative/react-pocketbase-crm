import { inject, singleshot } from "react-declarative";

import SettingsViewService from "../view/SettingsViewService";
import TYPES from "../../types";
import { makeObservable } from "mobx";

export class PermissionService {

    readonly settingsViewService = inject<SettingsViewService>(TYPES.settingsViewService);

    constructor() {
        makeObservable(this, {});
    }

    getFeatures = singleshot(async () => {
        const settings = await this.settingsViewService.getValue();
        return new Set(settings.features || []);
    });

    getVisibility = singleshot(async () => {
        const settings = await this.settingsViewService.getValue();
        return new Set(settings.visibility || []);
    });

    protected prefetch = singleshot(async () => {
        await this.getFeatures();
        await this.getVisibility();
    });

}

export default PermissionService;
