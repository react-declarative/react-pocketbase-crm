const baseServices = {
    alertService: Symbol.for('alertService'),
    layoutService: Symbol.for('layoutService'),
    routerService: Symbol.for('routerService'),
    errorService: Symbol.for('errorService'),
    loggerService: Symbol.for('loggerService'),
    pocketbaseService: Symbol.for('pocketbaseService'),
};

const dbServices = {
    employeeDbService: Symbol.for('employeeDbService'),
    historyDbService: Symbol.for('historyDbService'),
    settingsDbService: Symbol.for('settingsDbService'),
};

const viewServices = {
    employeeViewService: Symbol.for('employeeViewService'),
    historyViewService: Symbol.for('historyViewService'),
    settingsViewService: Symbol.for('settingsViewService'),
};

const globalServices = {
    permissionService: Symbol.for('permissionService'),
};

export const TYPES = {
    ...baseServices,
    ...dbServices,
    ...viewServices,
    ...globalServices,
};

export default TYPES;
