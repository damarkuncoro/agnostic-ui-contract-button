"use strict";
// contract-packages/agnostic-ui-contract-button/src/bootstrap.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonContractServiceContainer = void 0;
exports.getCreateButtonContractUseCase = getCreateButtonContractUseCase;
exports.getButtonContractFactory = getButtonContractFactory;
exports.getButtonContractService = getButtonContractService;
exports.getButtonContractValidator = getButtonContractValidator;
exports.getButtonContractRepository = getButtonContractRepository;
exports.getVariantFactory = getVariantFactory;
/**
 * Contract-Button Application Bootstrap
 * Sets up dependency injection container for button operations using DDD principles
 *
 * Infrastructure Layer - Why It Matters:
 * Infrastructure concerns (persistence, external services, frameworks) are
 * isolated here through interfaces and adapters. This allows the domain and
 * application layers to remain independent and testable.
 */
const CreateButtonContractUseCase_1 = require("./application/use-cases/CreateButtonContractUseCase");
const ButtonContractFactory_1 = require("./infrastructure/factories/ButtonContractFactory");
const ButtonContractValidator_1 = require("./infrastructure/validators/ButtonContractValidator");
const ButtonContractRepository_1 = require("./infrastructure/repositories/ButtonContractRepository");
const agnostic_ui_contract_core_1 = require("@damarkuncoro/agnostic-ui-contract-core");
/**
 * Button Contract Service Container
 * Manages the lifecycle of services and their dependencies
 */
class ButtonContractServiceContainer {
    constructor() {
        this.services = new Map();
        this.initializeServices();
    }
    static getInstance() {
        if (!ButtonContractServiceContainer.instance) {
            ButtonContractServiceContainer.instance = new ButtonContractServiceContainer();
        }
        return ButtonContractServiceContainer.instance;
    }
    initializeServices() {
        // Infrastructure - Factories
        const factory = new ButtonContractFactory_1.ButtonContractFactory();
        this.services.set('IButtonContractFactory', factory);
        this.services.set('ButtonContractFactory', factory);
        // Infrastructure - Validators
        const validator = new ButtonContractValidator_1.ButtonContractValidator();
        this.services.set('IButtonValidator', validator);
        this.services.set('ButtonContractValidator', validator);
        // Infrastructure - Repositories
        const repository = ButtonContractRepository_1.ButtonContractRepositoryFactory.createInMemory();
        this.services.set('IButtonContractRepository', repository);
        this.services.set('ButtonContractRepository', repository);
        // Domain Services - From contract-core
        const variantFactory = new agnostic_ui_contract_core_1.VariantFactory();
        this.services.set('VariantFactory', variantFactory);
        // Application - Use Cases
        const createUseCase = new CreateButtonContractUseCase_1.CreateButtonContractUseCase(factory);
        this.services.set('CreateButtonContractUseCase', createUseCase);
    }
    get(serviceName) {
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service not found: ${serviceName}`);
        }
        return service;
    }
    // Convenience methods for commonly used services
    getCreateButtonContractUseCase() {
        return this.get('CreateButtonContractUseCase');
    }
    getButtonContractFactory() {
        return this.get('ButtonContractFactory');
    }
    getButtonContractValidator() {
        return this.get('ButtonContractValidator');
    }
    getButtonContractRepository() {
        return this.get('ButtonContractRepository');
    }
    getVariantFactory() {
        return this.get('VariantFactory');
    }
}
// Export singleton instance
exports.buttonContractServiceContainer = ButtonContractServiceContainer.getInstance();
// Export convenience functions
function getCreateButtonContractUseCase() {
    return exports.buttonContractServiceContainer.getCreateButtonContractUseCase();
}
function getButtonContractFactory() {
    return exports.buttonContractServiceContainer.getButtonContractFactory();
}
// Export service locator function for generic access
function getButtonContractService(serviceName) {
    return exports.buttonContractServiceContainer.get(serviceName);
}
function getButtonContractValidator() {
    return exports.buttonContractServiceContainer.getButtonContractValidator();
}
function getButtonContractRepository() {
    return exports.buttonContractServiceContainer.getButtonContractRepository();
}
function getVariantFactory() {
    return exports.buttonContractServiceContainer.getVariantFactory();
}
