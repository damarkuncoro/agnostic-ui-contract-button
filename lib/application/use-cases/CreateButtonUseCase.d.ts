import { Button, ButtonEmphasis } from '../../domain/button/entities/Button';
import { IButtonValidator } from '../../domain/button/services/IButtonValidator';
/**
 * Create Button Use Case
 * Orchestrates the creation of new button instances with validation
 */
export declare class CreateButtonUseCase {
    private readonly buttonValidators;
    constructor(buttonValidators: IButtonValidator[]);
    /**
     * Executes the create button use case
     */
    execute(input: CreateButtonInput): Promise<CreateButtonOutput>;
    /**
     * Validates the input data
     */
    private validateInput;
    /**
     * Runs all button validators
     */
    private runButtonValidators;
    /**
     * Gets available button validators
     */
    getAvailableValidators(): string[];
    /**
     * Checks if a validator is available
     */
    hasValidator(validatorName: string): boolean;
    /**
     * Gets validator description
     */
    getValidatorDescription(validatorName: string): string | undefined;
    /**
     * Creates a standard submit button
     */
    createStandardSubmitButton(options?: {
        id?: string;
        emphasis?: ButtonEmphasis;
        hasIcon?: boolean;
    }): CreateButtonInput;
    /**
     * Creates a standard cancel button
     */
    createStandardCancelButton(options?: {
        id?: string;
        emphasis?: ButtonEmphasis;
        hasIcon?: boolean;
    }): CreateButtonInput;
    /**
     * Creates a standard primary action button
     */
    createStandardPrimaryButton(options?: {
        id?: string;
        hasIcon?: boolean;
        iconPosition?: 'start' | 'end';
    }): CreateButtonInput;
    /**
     * Creates a standard secondary action button
     */
    createStandardSecondaryButton(options?: {
        id?: string;
        hasIcon?: boolean;
        iconPosition?: 'start' | 'end';
    }): CreateButtonInput;
}
/**
 * Input for CreateButtonUseCase
 */
export interface CreateButtonInput {
    id?: string;
    buttonType: string;
    emphasis?: ButtonEmphasis;
    hasIcon?: boolean;
    iconPosition?: 'start' | 'end';
}
/**
 * Output for CreateButtonUseCase
 */
export interface CreateButtonOutput {
    button: Button;
    isValid: boolean;
    validationResults: {
        domain: {
            isValid: boolean;
            errors: string[];
            warnings: string[];
        };
        validators: Array<{
            validator: string;
            isValid: boolean;
            errors: string[];
            warnings: string[];
        }>;
        accessibility: {
            isAccessible: boolean;
            violations: string[];
        };
        combined: {
            isValid: boolean;
            errors: string[];
            warnings: string[];
        };
    };
    domainEvents: any[];
}
//# sourceMappingURL=CreateButtonUseCase.d.ts.map