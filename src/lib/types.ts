const baseServices = {
    alertService: Symbol.for('alertService'),
    layoutService: Symbol.for('layoutService'),
    routerService: Symbol.for('routerService'),
    errorService: Symbol.for('errorService'),
    loggerService: Symbol.for('loggerService'),
    pocketbaseService: Symbol.for('pocketbaseService'),
};

export const TYPES = {
    ...baseServices,
};

export default TYPES;
