const baseServices = {
    alertService: Symbol.for('alertService'),
    layoutService: Symbol.for('layoutService'),
    routerService: Symbol.for('routerService'),
    errorService: Symbol.for('errorService'),
    loggerService: Symbol.for('loggerService'),
    pocketbaseService: Symbol.for('pocketbaseService'),
};

const dbService = {
    employeeDbService: Symbol.for('employeeDbService'),
    historyDbService: Symbol.for('historyDbService'),
};

const viewService = {
    employeeViewService: Symbol.for('employeeViewService'),
    historyViewService: Symbol.for('historyViewService'),
};

export const TYPES = {
    ...baseServices,
    ...dbService,
    ...viewService,
};

export default TYPES;
