"use strict";
// =================================================================
// Agnostic UI Contract Button - Domain-Driven Design Architecture
// =================================================================
// 
// This package provides the button component contract with comprehensive
// business logic, accessibility compliance, and state management using DDD principles.
// 
// Architecture Layer:
// - Domain Layer: Entities, Value Objects, Domain Services
// - Application Layer: Use Cases for orchestration
// - Infrastructure Layer: Validators, Repositories
// =================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.uiA11yKeyboardActions = exports.uiA11yRoles = exports.uiButtonEmphases = exports.uiButtonTones = exports.uiButtonIntents = exports.uiButtonSizes = exports.getVariantFactory = exports.getButtonContractRepository = exports.getButtonContractValidator = exports.getCreateButtonContractUseCase = exports.getButtonContractService = exports.CreateButtonContractUseCase = exports.ButtonVariant = exports.ButtonContract = void 0;
exports.createStandardButtonContract = createStandardButtonContract;
exports.createButtonContract = createButtonContract;
// Initialize bootstrap
require("./bootstrap");
// =================================================================
// DDD ARCHITECTURE EXPORTS (New)
// =================================================================
// Domain Layer - Why It Matters:
// The domain layer contains the core business logic and rules. Entities represent
// business concepts with identity and behavior, while Value Objects represent
// immutable descriptive aspects. This separation ensures business rules are
// preserved and testable independently of infrastructure concerns.
var ButtonContract_1 = require("./domain/contract/entities/ButtonContract");
Object.defineProperty(exports, "ButtonContract", { enumerable: true, get: function () { return ButtonContract_1.ButtonContract; } });
var ButtonVariant_1 = require("./domain/contract/value-objects/ButtonVariant");
Object.defineProperty(exports, "ButtonVariant", { enumerable: true, get: function () { return ButtonVariant_1.ButtonVariant; } });
// Application Layer - Why It Matters:
// Use Cases orchestrate complex business operations and coordinate between
// domain objects. They encapsulate application-specific logic while keeping
// the domain layer pure and focused on business rules.
var CreateButtonContractUseCase_1 = require("./application/use-cases/CreateButtonContractUseCase");
Object.defineProperty(exports, "CreateButtonContractUseCase", { enumerable: true, get: function () { return CreateButtonContractUseCase_1.CreateButtonContractUseCase; } });
// Dependency Injection - Why It Matters:
// Dependency injection enables loose coupling between components, making the system
// more testable and maintainable. The service container manages the lifecycle of
// services and their dependencies.
var bootstrap_1 = require("./bootstrap");
Object.defineProperty(exports, "getButtonContractService", { enumerable: true, get: function () { return bootstrap_1.getButtonContractService; } });
Object.defineProperty(exports, "getCreateButtonContractUseCase", { enumerable: true, get: function () { return bootstrap_1.getCreateButtonContractUseCase; } });
Object.defineProperty(exports, "getButtonContractValidator", { enumerable: true, get: function () { return bootstrap_1.getButtonContractValidator; } });
Object.defineProperty(exports, "getButtonContractRepository", { enumerable: true, get: function () { return bootstrap_1.getButtonContractRepository; } });
Object.defineProperty(exports, "getVariantFactory", { enumerable: true, get: function () { return bootstrap_1.getVariantFactory; } });
var agnostic_ui_contract_core_1 = require("@damarkuncoro/agnostic-ui-contract-core");
Object.defineProperty(exports, "uiButtonSizes", { enumerable: true, get: function () { return agnostic_ui_contract_core_1.uiSizes; } });
Object.defineProperty(exports, "uiButtonIntents", { enumerable: true, get: function () { return agnostic_ui_contract_core_1.uiIntents; } });
Object.defineProperty(exports, "uiButtonTones", { enumerable: true, get: function () { return agnostic_ui_contract_core_1.uiTones; } });
Object.defineProperty(exports, "uiButtonEmphases", { enumerable: true, get: function () { return agnostic_ui_contract_core_1.uiEmphases; } });
Object.defineProperty(exports, "uiA11yRoles", { enumerable: true, get: function () { return agnostic_ui_contract_core_1.uiA11yRoles; } });
Object.defineProperty(exports, "uiA11yKeyboardActions", { enumerable: true, get: function () { return agnostic_ui_contract_core_1.uiA11yKeyboardActions; } });
// =================================================================
// MIGRATION HELPERS
// =================================================================
const ButtonContract_2 = require("./domain/contract/entities/ButtonContract");
const ButtonVariant_2 = require("./domain/contract/value-objects/ButtonVariant");
const bootstrap_2 = require("./bootstrap");
/**
 * Creates a standard button contract using DDD
 */
function createStandardButtonContract(name) {
    return ButtonContract_2.ButtonContract.create({
        name,
        variants: [
            ButtonVariant_2.ButtonVariant.createSizeVariant(),
            ButtonVariant_2.ButtonVariant.createIntentVariant(),
            ButtonVariant_2.ButtonVariant.createToneVariant(),
            ButtonVariant_2.ButtonVariant.createEmphasisVariant()
        ],
        props: [
            { name: 'disabled', type: 'boolean', required: false, default: false },
            { name: 'loading', type: 'boolean', required: false, default: false },
            { name: 'icon', type: 'string', required: false },
            { name: 'iconPosition', type: 'string', enum: ['start', 'end'], required: false, default: 'start' }
        ],
        accessibility: {
            role: 'button',
            keyboard: ['Enter', 'Space'],
            focusable: true,
            label: true
        }
    });
}
/**
 * Creates a button contract using the use case
 */
async function createButtonContract(request) {
    const useCase = (0, bootstrap_2.getCreateButtonContractUseCase)();
    return useCase.execute(request);
}
