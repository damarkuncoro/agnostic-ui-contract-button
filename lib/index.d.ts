import './bootstrap';
export { Button, ButtonState, ButtonEmphasis } from './domain/button/entities/Button';
export { ButtonType } from './domain/shared/value-objects/ButtonType';
export { CreateButtonUseCase } from './application/use-cases/CreateButtonUseCase';
export type { CreateButtonInput, CreateButtonOutput } from './application/use-cases/CreateButtonUseCase';
export { ButtonAccessibilityValidator } from './infrastructure/validators/ButtonAccessibilityValidator';
export type { IButtonValidator } from './domain/button/services/IButtonValidator';
export type { ButtonDomainEvent, ButtonCreatedEvent, ButtonClickedEvent, ButtonStateChangedEvent, ButtonAccessibilityValidatedEvent } from './domain/shared/events/DomainEvent';
export { getCreateButtonUseCase, getButtonAccessibilityValidator, getButtonValidators, getButtonService } from './bootstrap';
export type { UiVariantSize, UiVariantIntent, UiVariantTone, UiVariantEmphasis, UiA11yRole, UiA11yKeyboardAction } from "@damarkuncoro/agnostic-ui-contract-box";
export { uiSizes as uiButtonSizes, uiIntents as uiButtonIntents, uiTones as uiButtonTones, uiEmphases as uiButtonEmphases, uiA11yRoles, uiA11yKeyboardActions } from "@damarkuncoro/agnostic-ui-contract-box";
export type UiButtonEmphasis = "low" | "medium" | "high";
export type UiButtonSize = import("@damarkuncoro/agnostic-ui-contract-box").UiVariantSize;
export type UiButtonIntent = import("@damarkuncoro/agnostic-ui-contract-box").UiVariantIntent;
export type UiButtonTone = import("@damarkuncoro/agnostic-ui-contract-box").UiVariantTone;
import { Button } from './domain/button/entities/Button';
import type { CreateButtonInput } from './application/use-cases/CreateButtonUseCase';
/**
 * Migrates legacy button creation to DDD Button entity
 * @param legacyConfig Legacy button configuration
 * @returns DDD Button entity
 */
export declare function createButtonDDD(legacyConfig: {
    buttonType: string;
    emphasis?: 'low' | 'medium' | 'high';
    hasIcon?: boolean;
    iconPosition?: 'start' | 'end';
    id?: string;
}): Button;
/**
 * Migrates legacy button validation to DDD use case
 * @param legacyConfig Legacy button configuration
 * @returns Promise resolving to validation result
 */
export declare function validateButtonDDD(legacyConfig: {
    buttonType: string;
    emphasis?: 'low' | 'medium' | 'high';
    hasIcon?: boolean;
    iconPosition?: 'start' | 'end';
    id?: string;
}): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    button: Button;
}>;
/**
 * Creates a standard submit button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard submit button
 */
export declare function createStandardSubmitButton(options?: {
    id?: string;
    hasIcon?: boolean;
}): CreateButtonInput;
/**
 * Creates a standard cancel button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard cancel button
 */
export declare function createStandardCancelButton(options?: {
    id?: string;
    hasIcon?: boolean;
}): CreateButtonInput;
/**
 * Creates a standard primary action button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard primary button
 */
export declare function createStandardPrimaryButton(options?: {
    id?: string;
    hasIcon?: boolean;
    iconPosition?: 'start' | 'end';
}): CreateButtonInput;
/**
 * Creates a standard secondary action button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard secondary button
 */
export declare function createStandardSecondaryButton(options?: {
    id?: string;
    hasIcon?: boolean;
    iconPosition?: 'start' | 'end';
}): CreateButtonInput;
/**
 * Converts DDD Button entity back to legacy format
 * @param button DDD Button entity
 * @returns Legacy button format
 */
export declare function convertButtonToLegacy(button: Button): {
    buttonType: string;
    emphasis: string;
    hasIcon: boolean;
    iconPosition: 'start' | 'end';
    state: string;
    isAccessible: boolean;
    clickCount: number;
};
/**
 * Checks if a button configuration is valid using DDD validation
 * @param config Button configuration
 * @returns Validation result
 */
export declare function isValidButtonConfiguration(config: any): boolean;
export declare function getStandardButtonConfigs(): {
    submit: {
        buttonType: string;
        emphasis: string;
    };
    cancel: {
        buttonType: string;
        emphasis: string;
    };
    primary: {
        buttonType: string;
        emphasis: string;
    };
    secondary: {
        buttonType: string;
        emphasis: string;
    };
};
//# sourceMappingURL=index.d.ts.map