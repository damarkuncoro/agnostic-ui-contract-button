"use strict";
// contract-packages/agnostic-ui-contract-button/src/infrastructure/validators/ButtonContractValidator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonContractValidator = void 0;
/**
 * Button Contract Validator
 * Validates button contract definitions against business rules and accessibility standards
 */
class ButtonContractValidator {
    getName() {
        return 'button-contract-validator';
    }
    getDescription() {
        return 'Validates button contract definitions against button-specific business rules and accessibility standards';
    }
    async validate(contract, _context) {
        const errors = [];
        const warnings = [];
        // Validate required variants
        this.validateRequiredVariants(contract, errors, warnings);
        // Validate button-specific props
        this.validateButtonProps(contract, errors, warnings);
        // Validate accessibility compliance
        this.validateAccessibilityCompliance(contract, errors, warnings);
        // Validate variant combinations
        this.validateVariantCombinations(contract, errors, warnings);
        // Validate business rules
        this.validateBusinessRules(contract, errors, warnings);
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }
    supportsValidationType(type) {
        return [
            'button',
            'accessibility',
            'variants',
            'props',
            'combinations',
            'business-rules'
        ].includes(type);
    }
    getPriority() {
        return 100; // High priority for button-specific validation
    }
    /**
     * Validates required variants for button contracts
     */
    validateRequiredVariants(contract, errors, warnings) {
        const requiredVariants = ['size', 'intent'];
        const recommendedVariants = ['tone', 'emphasis'];
        for (const variantName of requiredVariants) {
            if (!contract.getVariantByType(variantName)) {
                errors.push(`Button contracts must have '${variantName}' variant`);
            }
        }
        for (const variantName of recommendedVariants) {
            if (!contract.getVariantByType(variantName)) {
                warnings.push(`Button contracts typically include '${variantName}' variant`);
            }
        }
    }
    /**
     * Validates button-specific properties
     */
    validateButtonProps(contract, errors, warnings) {
        const props = contract.props;
        // Check for required button props
        const hasLabel = props.some(p => p.name === 'label');
        if (!hasLabel) {
            errors.push('Button contracts must have a label prop');
        }
        // Validate disabled prop
        const disabledProp = props.find(p => p.name === 'disabled');
        if (disabledProp) {
            if (disabledProp.type !== 'boolean') {
                errors.push('Disabled prop must be of type boolean');
            }
            if (disabledProp.default !== false) {
                warnings.push('Disabled prop should default to false');
            }
        }
        else {
            warnings.push('Button contracts typically include disabled state');
        }
        // Validate loading prop
        const loadingProp = props.find(p => p.name === 'loading');
        if (loadingProp && loadingProp.type !== 'boolean') {
            errors.push('Loading prop must be of type boolean');
        }
        // Validate icon-related props
        const iconProp = props.find(p => p.name === 'icon');
        const iconPositionProp = props.find(p => p.name === 'iconPosition');
        if (iconProp && iconPositionProp) {
            if (iconPositionProp.enum && !iconPositionProp.enum.includes('start') && !iconPositionProp.enum.includes('end')) {
                errors.push('Icon position should allow "start" and "end" values');
            }
        }
    }
    /**
     * Validates accessibility compliance
     */
    validateAccessibilityCompliance(contract, errors, warnings) {
        const accessibility = contract.accessibility;
        // Button must have button role
        if (accessibility.role !== 'button') {
            errors.push('Button contracts must have role "button"');
        }
        // Button must support Enter and Space keyboard actions
        const requiredKeys = ['Enter', 'Space'];
        for (const key of requiredKeys) {
            if (!accessibility.keyboard.includes(key)) {
                errors.push(`Button contracts must support "${key}" keyboard action`);
            }
        }
        // Button should be focusable
        if (!accessibility.focusable) {
            errors.push('Button contracts must be focusable');
        }
        // Button should have label requirement
        if (!accessibility.label) {
            warnings.push('Button contracts should require labels for accessibility');
        }
        // Validate keyboard actions are valid
        const validKeys = [
            'Enter', 'Space', 'Escape', 'ArrowUp', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp',
            'PageDown', 'Tab', 'Shift+Tab'
        ];
        const invalidKeys = accessibility.keyboard.filter(key => !validKeys.includes(key));
        if (invalidKeys.length > 0) {
            errors.push(`Invalid keyboard actions: ${invalidKeys.join(', ')}`);
        }
    }
    /**
     * Validates variant combinations
     */
    validateVariantCombinations(contract, errors, warnings) {
        const variants = contract.variants;
        // Check for conflicting variant values
        const sizeVariant = contract.getVariantByType('size');
        const intentVariant = contract.getVariantByType('intent');
        if (sizeVariant && intentVariant) {
            // Primary buttons should work with all sizes
            if (intentVariant.values.includes('primary') && sizeVariant.values.length < 3) {
                warnings.push('Primary intent should support multiple sizes (xs, sm, md, lg, xl)');
            }
        }
        // Check for duplicate variant types
        const variantTypes = new Set();
        for (const variant of variants) {
            if (variantTypes.has(variant.type)) {
                errors.push(`Duplicate variant type: ${variant.type}`);
            }
            variantTypes.add(variant.type);
        }
    }
    /**
     * Validates business rules specific to buttons
     */
    validateBusinessRules(contract, errors, warnings) {
        // Business rule: Buttons should not have too many variants
        if (contract.variants.length > 6) {
            warnings.push('Button contracts with many variants may be complex to implement');
        }
        // Business rule: Buttons should have reasonable number of props
        if (contract.props.length > 10) {
            warnings.push('Button contracts with many props may violate single responsibility principle');
        }
        // Business rule: Icon buttons should have aria-label
        const hasIcon = contract.props.some(p => p.name === 'icon');
        const hasAriaLabel = contract.props.some(p => p.name === 'ariaLabel');
        if (hasIcon && !hasAriaLabel) {
            warnings.push('Icon buttons should have aria-label prop for accessibility');
        }
        // Business rule: Loading state should disable interaction
        const hasLoading = contract.props.some(p => p.name === 'loading');
        const hasDisabled = contract.props.some(p => p.name === 'disabled');
        if (hasLoading && !hasDisabled) {
            warnings.push('Buttons with loading state should also support disabled state');
        }
    }
}
exports.ButtonContractValidator = ButtonContractValidator;
