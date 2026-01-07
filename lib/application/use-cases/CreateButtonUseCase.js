"use strict";
// contract-packages/agnostic-ui-contract-button/src/application/use-cases/CreateButtonUseCase.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateButtonUseCase = void 0;
const Button_1 = require("../../domain/button/entities/Button");
const ButtonType_1 = require("../../domain/shared/value-objects/ButtonType");
/**
 * Create Button Use Case
 * Orchestrates the creation of new button instances with validation
 */
class CreateButtonUseCase {
    constructor(buttonValidators) {
        this.buttonValidators = buttonValidators;
    }
    /**
     * Executes the create button use case
     */
    async execute(input) {
        // Validate input
        this.validateInput(input);
        // Create button instance
        const button = Button_1.Button.create({
            id: input.id,
            buttonType: input.buttonType,
            emphasis: input.emphasis,
            hasIcon: input.hasIcon,
            iconPosition: input.iconPosition
        });
        // Run additional validations
        const validationResults = await this.runButtonValidators(button);
        // Combine all validation results
        const allErrors = validationResults.flatMap(r => r.errors);
        const allWarnings = validationResults.flatMap(r => r.warnings);
        const isValid = allErrors.length === 0;
        // Perform accessibility validation
        const accessibilityResult = button.validateAccessibility();
        return {
            button,
            isValid,
            validationResults: {
                domain: { isValid: true, errors: [], warnings: [] }, // Domain validation already passed
                validators: validationResults,
                accessibility: accessibilityResult,
                combined: {
                    isValid: isValid && accessibilityResult.isAccessible,
                    errors: [...allErrors, ...accessibilityResult.violations],
                    warnings: allWarnings
                }
            },
            domainEvents: button.getDomainEvents()
        };
    }
    /**
     * Validates the input data
     */
    validateInput(input) {
        if (!input.buttonType || typeof input.buttonType !== 'string') {
            throw new Error('Button type is required and must be a string');
        }
        // Validate button type
        try {
            ButtonType_1.ButtonType.create(input.buttonType);
        }
        catch (error) {
            throw new Error(`Invalid button type: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        // Validate emphasis
        if (input.emphasis !== undefined) {
            const validEmphases = Object.values(Button_1.ButtonEmphasis);
            if (!validEmphases.includes(input.emphasis)) {
                throw new Error(`Invalid emphasis. Must be one of: ${validEmphases.join(', ')}`);
            }
        }
        // Validate icon position
        if (input.iconPosition && !['start', 'end'].includes(input.iconPosition)) {
            throw new Error('Icon position must be either "start" or "end"');
        }
    }
    /**
     * Runs all button validators
     */
    async runButtonValidators(button) {
        const results = [];
        for (const validator of this.buttonValidators) {
            try {
                const result = await validator.validate(button);
                results.push({
                    validator: validator.getName(),
                    isValid: result.isValid,
                    errors: result.errors,
                    warnings: result.warnings
                });
            }
            catch (error) {
                results.push({
                    validator: validator.getName(),
                    isValid: false,
                    errors: [error instanceof Error ? error.message : 'Validation failed'],
                    warnings: []
                });
            }
        }
        return results;
    }
    /**
     * Gets available button validators
     */
    getAvailableValidators() {
        return this.buttonValidators.map(v => v.getName());
    }
    /**
     * Checks if a validator is available
     */
    hasValidator(validatorName) {
        return this.buttonValidators.some(v => v.getName() === validatorName);
    }
    /**
     * Gets validator description
     */
    getValidatorDescription(validatorName) {
        const validator = this.buttonValidators.find(v => v.getName() === validatorName);
        return validator?.getDescription();
    }
    /**
     * Creates a standard submit button
     */
    createStandardSubmitButton(options = {}) {
        return {
            buttonType: 'submit',
            emphasis: options.emphasis || Button_1.ButtonEmphasis.HIGH,
            hasIcon: options.hasIcon || false,
            id: options.id
        };
    }
    /**
     * Creates a standard cancel button
     */
    createStandardCancelButton(options = {}) {
        return {
            buttonType: 'button',
            emphasis: options.emphasis || Button_1.ButtonEmphasis.LOW,
            hasIcon: options.hasIcon || false,
            id: options.id
        };
    }
    /**
     * Creates a standard primary action button
     */
    createStandardPrimaryButton(options = {}) {
        return {
            buttonType: 'button',
            emphasis: Button_1.ButtonEmphasis.HIGH,
            hasIcon: options.hasIcon || false,
            iconPosition: options.iconPosition || 'start',
            id: options.id
        };
    }
    /**
     * Creates a standard secondary action button
     */
    createStandardSecondaryButton(options = {}) {
        return {
            buttonType: 'button',
            emphasis: Button_1.ButtonEmphasis.MEDIUM,
            hasIcon: options.hasIcon || false,
            iconPosition: options.iconPosition || 'start',
            id: options.id
        };
    }
}
exports.CreateButtonUseCase = CreateButtonUseCase;
//# sourceMappingURL=CreateButtonUseCase.js.map