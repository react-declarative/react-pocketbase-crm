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
}

export const TYPES = {
    ...baseServices,
    ...dbService,
};

export default TYPES;
