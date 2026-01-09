import { ButtonContract } from '../../domain/contract/entities/ButtonContract';
import { IButtonValidator } from '../../domain/contract/services/IButtonValidator';
/**
 * Button Contract Validator
 * Validates button contract definitions against business rules and accessibility standards
 */
export declare class ButtonContractValidator implements IButtonValidator {
    getName(): string;
    getDescription(): string;
    validate(contract: ButtonContract, _context?: any): Promise<{
        isValid: boolean;
        errors: string[];
        warnings: string[];
    }>;
    supportsValidationType(type: string): boolean;
    getPriority(): number;
    /**
     * Validates required variants for button contracts
     */
    private validateRequiredVariants;
    /**
     * Validates button-specific properties
     */
    private validateButtonProps;
    /**
     * Validates accessibility compliance
     */
    private validateAccessibilityCompliance;
    /**
     * Validates variant combinations
     */
    private validateVariantCombinations;
    /**
     * Validates business rules specific to buttons
     */
    private validateBusinessRules;
}
//# sourceMappingURL=ButtonContractValidator.d.ts.map