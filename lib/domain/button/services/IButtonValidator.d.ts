import { Button } from '../entities/Button';
/**
 * Button Validator Interface
 * Defines the contract for validating button instances
 */
export interface IButtonValidator {
    /**
     * Gets the validator name
     */
    getName(): string;
    /**
     * Gets the validator description
     */
    getDescription(): string;
    /**
     * Validates a button instance
     */
    validate(button: Button, context?: any): Promise<{
        isValid: boolean;
        errors: string[];
        warnings: string[];
    }>;
    /**
     * Checks if this validator supports a specific validation type
     */
    supportsValidationType(type: string): boolean;
    /**
     * Gets the priority of this validator (higher = more important)
     */
    getPriority(): number;
}
//# sourceMappingURL=IButtonValidator.d.ts.map