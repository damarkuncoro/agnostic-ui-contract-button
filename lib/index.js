"use strict";
// =================================================================
// Agnostic UI Contract Button - Domain-Driven Architecture
//
// This package provides the button component contract with comprehensive
// business logic, accessibility compliance, and state management using DDD principles.
// =================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.uiButtonTypes = exports.uiA11yKeyboardActions = exports.uiA11yRoles = exports.uiButtonEmphases = exports.uiButtonTones = exports.uiButtonIntents = exports.uiButtonSizes = exports.getButtonService = exports.getButtonValidators = exports.getButtonAccessibilityValidator = exports.getCreateButtonUseCase = exports.ButtonAccessibilityValidator = exports.CreateButtonUseCase = exports.ButtonType = exports.ButtonEmphasis = exports.ButtonState = exports.Button = void 0;
exports.createButtonDDD = createButtonDDD;
exports.validateButtonDDD = validateButtonDDD;
exports.createStandardSubmitButton = createStandardSubmitButton;
exports.createStandardCancelButton = createStandardCancelButton;
exports.createStandardPrimaryButton = createStandardPrimaryButton;
exports.createStandardSecondaryButton = createStandardSecondaryButton;
exports.convertButtonToLegacy = convertButtonToLegacy;
exports.isValidButtonConfiguration = isValidButtonConfiguration;
exports.getStandardButtonConfigs = getStandardButtonConfigs;
// Initialize bootstrap
require("./bootstrap");
// =================================================================
// DDD ARCHITECTURE EXPORTS (New)
// =================================================================
// Domain Layer
var Button_1 = require("./domain/button/entities/Button");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return Button_1.Button; } });
Object.defineProperty(exports, "ButtonState", { enumerable: true, get: function () { return Button_1.ButtonState; } });
Object.defineProperty(exports, "ButtonEmphasis", { enumerable: true, get: function () { return Button_1.ButtonEmphasis; } });
var ButtonType_1 = require("./domain/shared/value-objects/ButtonType");
Object.defineProperty(exports, "ButtonType", { enumerable: true, get: function () { return ButtonType_1.ButtonType; } });
// Application Layer
var CreateButtonUseCase_1 = require("./application/use-cases/CreateButtonUseCase");
Object.defineProperty(exports, "CreateButtonUseCase", { enumerable: true, get: function () { return CreateButtonUseCase_1.CreateButtonUseCase; } });
// Infrastructure Layer
var ButtonAccessibilityValidator_1 = require("./infrastructure/validators/ButtonAccessibilityValidator");
Object.defineProperty(exports, "ButtonAccessibilityValidator", { enumerable: true, get: function () { return ButtonAccessibilityValidator_1.ButtonAccessibilityValidator; } });
// Dependency Injection
var bootstrap_1 = require("./bootstrap");
Object.defineProperty(exports, "getCreateButtonUseCase", { enumerable: true, get: function () { return bootstrap_1.getCreateButtonUseCase; } });
Object.defineProperty(exports, "getButtonAccessibilityValidator", { enumerable: true, get: function () { return bootstrap_1.getButtonAccessibilityValidator; } });
Object.defineProperty(exports, "getButtonValidators", { enumerable: true, get: function () { return bootstrap_1.getButtonValidators; } });
Object.defineProperty(exports, "getButtonService", { enumerable: true, get: function () { return bootstrap_1.getButtonService; } });
var agnostic_ui_contract_box_1 = require("@damarkuncoro/agnostic-ui-contract-box");
Object.defineProperty(exports, "uiButtonSizes", { enumerable: true, get: function () { return agnostic_ui_contract_box_1.uiSizes; } });
Object.defineProperty(exports, "uiButtonIntents", { enumerable: true, get: function () { return agnostic_ui_contract_box_1.uiIntents; } });
Object.defineProperty(exports, "uiButtonTones", { enumerable: true, get: function () { return agnostic_ui_contract_box_1.uiTones; } });
Object.defineProperty(exports, "uiButtonEmphases", { enumerable: true, get: function () { return agnostic_ui_contract_box_1.uiEmphases; } });
Object.defineProperty(exports, "uiA11yRoles", { enumerable: true, get: function () { return agnostic_ui_contract_box_1.uiA11yRoles; } });
Object.defineProperty(exports, "uiA11yKeyboardActions", { enumerable: true, get: function () { return agnostic_ui_contract_box_1.uiA11yKeyboardActions; } });
var variant_1 = require("./variant");
Object.defineProperty(exports, "uiButtonTypes", { enumerable: true, get: function () { return variant_1.uiButtonTypes; } });
// =================================================================
// MIGRATION HELPERS
// =================================================================
const Button_2 = require("./domain/button/entities/Button");
const bootstrap_2 = require("./bootstrap");
/**
 * Migrates legacy button creation to DDD Button entity
 * @param legacyConfig Legacy button configuration
 * @returns DDD Button entity
 */
function createButtonDDD(legacyConfig) {
    // Map legacy emphasis to new enum
    const emphasisMap = {
        'low': Button_2.ButtonEmphasis.LOW,
        'medium': Button_2.ButtonEmphasis.MEDIUM,
        'high': Button_2.ButtonEmphasis.HIGH
    };
    const emphasis = legacyConfig.emphasis ? emphasisMap[legacyConfig.emphasis] : Button_2.ButtonEmphasis.MEDIUM;
    return Button_2.Button.create({
        id: legacyConfig.id,
        buttonType: legacyConfig.buttonType,
        emphasis,
        hasIcon: legacyConfig.hasIcon,
        iconPosition: legacyConfig.iconPosition
    });
}
/**
 * Migrates legacy button validation to DDD use case
 * @param legacyConfig Legacy button configuration
 * @returns Promise resolving to validation result
 */
async function validateButtonDDD(legacyConfig) {
    const button = createButtonDDD(legacyConfig);
    const accessibilityResult = button.validateAccessibility();
    return {
        isValid: accessibilityResult.isAccessible,
        errors: accessibilityResult.violations,
        warnings: [],
        button
    };
}
/**
 * Creates a standard submit button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard submit button
 */
function createStandardSubmitButton(options = {}) {
    const useCase = (0, bootstrap_2.getCreateButtonUseCase)();
    return useCase.createStandardSubmitButton(options);
}
/**
 * Creates a standard cancel button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard cancel button
 */
function createStandardCancelButton(options = {}) {
    const useCase = (0, bootstrap_2.getCreateButtonUseCase)();
    return useCase.createStandardCancelButton(options);
}
/**
 * Creates a standard primary action button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard primary button
 */
function createStandardPrimaryButton(options = {}) {
    const useCase = (0, bootstrap_2.getCreateButtonUseCase)();
    return useCase.createStandardPrimaryButton(options);
}
/**
 * Creates a standard secondary action button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard secondary button
 */
function createStandardSecondaryButton(options = {}) {
    const useCase = (0, bootstrap_2.getCreateButtonUseCase)();
    return useCase.createStandardSecondaryButton(options);
}
/**
 * Converts DDD Button entity back to legacy format
 * @param button DDD Button entity
 * @returns Legacy button format
 */
function convertButtonToLegacy(button) {
    // Map new emphasis enum to legacy string
    const emphasisMap = {
        [Button_2.ButtonEmphasis.LOW]: 'low',
        [Button_2.ButtonEmphasis.MEDIUM]: 'medium',
        [Button_2.ButtonEmphasis.HIGH]: 'high'
    };
    // Map new state enum to legacy string
    const stateMap = {
        'idle': 'idle',
        'hovered': 'hovered',
        'pressed': 'pressed',
        'focused': 'focused',
        'disabled': 'disabled',
        'loading': 'loading'
    };
    return {
        buttonType: button.buttonType.value,
        emphasis: emphasisMap[button.emphasis],
        hasIcon: button.hasIcon,
        iconPosition: button.iconPosition,
        state: stateMap[button.state],
        isAccessible: button.isAccessible,
        clickCount: button.clickCount
    };
}
/**
 * Checks if a button configuration is valid using DDD validation
 * @param config Button configuration
 * @returns Validation result
 */
function isValidButtonConfiguration(config) {
    try {
        const button = createButtonDDD(config);
        const accessibilityResult = button.validateAccessibility();
        return accessibilityResult.isAccessible;
    }
    catch (error) {
        return false;
    }
}
// =================================================================
// LEGACY UTILITY FUNCTIONS (Deprecated)
// =================================================================
// Quick access to standard button configurations (deprecated - use DDD services)
function getStandardButtonConfigs() {
    return {
        submit: { buttonType: 'submit', emphasis: 'high' },
        cancel: { buttonType: 'button', emphasis: 'low' },
        primary: { buttonType: 'button', emphasis: 'high' },
        secondary: { buttonType: 'button', emphasis: 'medium' }
    };
}
//# sourceMappingURL=index.js.map