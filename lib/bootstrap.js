"use strict";
// contract-packages/agnostic-ui-contract-button/src/bootstrap.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonServiceContainer = void 0;
exports.getCreateButtonUseCase = getCreateButtonUseCase;
exports.getButtonAccessibilityValidator = getButtonAccessibilityValidator;
exports.getButtonValidators = getButtonValidators;
exports.getButtonService = getButtonService;
/**
 * Contract-Button Application Bootstrap
 * Sets up dependency injection container for button operations using DDD principles
 */
const CreateButtonUseCase_1 = require("./application/use-cases/CreateButtonUseCase");
const ButtonAccessibilityValidator_1 = require("./infrastructure/validators/ButtonAccessibilityValidator");
// Service container for dependency injection
class ButtonServiceContainer {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    static getInstance() {
        if (!ButtonServiceContainer.instance) {
            ButtonServiceContainer.instance = new ButtonServiceContainer();
        }
        return ButtonServiceContainer.instance;
    }
    initializeServices() {
        // Infrastructure - Button Validators
        const accessibilityValidator = new ButtonAccessibilityValidator_1.ButtonAccessibilityValidator();
        this.services.set('ButtonAccessibilityValidator', accessibilityValidator);
        // Button Validators Array
        const buttonValidators = [accessibilityValidator];
        this.services.set('ButtonValidators', buttonValidators);
        // Application Services
        this.services.set('CreateButtonUseCase', new CreateButtonUseCase_1.CreateButtonUseCase(buttonValidators));
    }
    get(serviceName) {
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service not found: ${serviceName}`);
        }
        return service;
    }
    // Convenience methods for commonly used services
    getCreateButtonUseCase() {
        return this.get('CreateButtonUseCase');
    }
    getButtonAccessibilityValidator() {
        return this.get('ButtonAccessibilityValidator');
    }
    getButtonValidators() {
        return this.get('ButtonValidators');
    }
}
// Export singleton instance
exports.buttonServiceContainer = ButtonServiceContainer.getInstance();
// Export convenience functions
function getCreateButtonUseCase() {
    return exports.buttonServiceContainer.getCreateButtonUseCase();
}
function getButtonAccessibilityValidator() {
    return exports.buttonServiceContainer.getButtonAccessibilityValidator();
}
function getButtonValidators() {
    return exports.buttonServiceContainer.getButtonValidators();
}
// Export service locator function for generic access
function getButtonService(serviceName) {
    return exports.buttonServiceContainer.get(serviceName);
}
//# sourceMappingURL=bootstrap.js.map