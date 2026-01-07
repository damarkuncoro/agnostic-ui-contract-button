// =================================================================
// Agnostic UI Contract Button - Domain-Driven Architecture
//
// This package provides the button component contract with comprehensive
// business logic, accessibility compliance, and state management using DDD principles.
// =================================================================

// Initialize bootstrap
import './bootstrap'

// =================================================================
// DDD ARCHITECTURE EXPORTS (New)
// =================================================================

// Domain Layer
export { Button, ButtonState, ButtonEmphasis } from './domain/button/entities/Button';
export { ButtonType } from './domain/shared/value-objects/ButtonType';

// Application Layer
export { CreateButtonUseCase } from './application/use-cases/CreateButtonUseCase';
export type {
  CreateButtonInput,
  CreateButtonOutput
} from './application/use-cases/CreateButtonUseCase';

// Infrastructure Layer
export { ButtonAccessibilityValidator } from './infrastructure/validators/ButtonAccessibilityValidator';
export type { IButtonValidator } from './domain/button/services/IButtonValidator';

// Domain Events
export type {
  ButtonDomainEvent,
  ButtonCreatedEvent,
  ButtonClickedEvent,
  ButtonStateChangedEvent,
  ButtonAccessibilityValidatedEvent
} from './domain/shared/events/DomainEvent';

// Dependency Injection
export {
  getCreateButtonUseCase,
  getButtonAccessibilityValidator,
  getButtonValidators,
  getButtonService
} from './bootstrap';

// =================================================================
// LEGACY COMPATIBILITY EXPORTS (Maintained)
// =================================================================

// Re-export from contract-box (which includes contract-core)
export type {
  UiVariantSize,
  UiVariantIntent,
  UiVariantTone,
  UiVariantEmphasis,
  UiA11yRole,
  UiA11yKeyboardAction
} from "@damarkuncoro/agnostic-ui-contract-box"

export {
  uiSizes as uiButtonSizes,
  uiIntents as uiButtonIntents,
  uiTones as uiButtonTones,
  uiEmphases as uiButtonEmphases,
  uiA11yRoles,
  uiA11yKeyboardActions
} from "@damarkuncoro/agnostic-ui-contract-box"

// Re-export button-specific types and arrays
export type {
  UiButtonVariant,
  UiButtonVariantExtended,
  UiButtonType,
  UiButtonIconVariant
} from "./variant"

// Re-export button size/intent/tone types from box
export type {
  UiVariantSize as UiButtonSize,
  UiVariantIntent as UiButtonIntent,
  UiVariantTone as UiButtonTone
} from "@damarkuncoro/agnostic-ui-contract-box"

// Button-specific emphasis
export type UiButtonEmphasis = "low" | "medium" | "high"

export {
  uiButtonTypes
} from "./variant"

// Re-export button-specific contracts
export type { UiButtonProps } from "./props"
export type { UiButtonState } from "./state"
export type { UiButtonA11y } from "./a11y"

// =================================================================
// MIGRATION HELPERS
// =================================================================

import { Button, ButtonEmphasis } from './domain/button/entities/Button';
import { ButtonType } from './domain/shared/value-objects/ButtonType';
import { getCreateButtonUseCase } from './bootstrap';
import type { CreateButtonInput } from './application/use-cases/CreateButtonUseCase';

/**
 * Migrates legacy button creation to DDD Button entity
 * @param legacyConfig Legacy button configuration
 * @returns DDD Button entity
 */
export function createButtonDDD(legacyConfig: {
  buttonType: string;
  emphasis?: 'low' | 'medium' | 'high';
  hasIcon?: boolean;
  iconPosition?: 'start' | 'end';
  id?: string;
}): Button {
  // Map legacy emphasis to new enum
  const emphasisMap: Record<string, ButtonEmphasis> = {
    'low': ButtonEmphasis.LOW,
    'medium': ButtonEmphasis.MEDIUM,
    'high': ButtonEmphasis.HIGH
  };

  const emphasis = legacyConfig.emphasis ? emphasisMap[legacyConfig.emphasis] : ButtonEmphasis.MEDIUM;

  return Button.create({
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
export async function validateButtonDDD(legacyConfig: {
  buttonType: string;
  emphasis?: 'low' | 'medium' | 'high';
  hasIcon?: boolean;
  iconPosition?: 'start' | 'end';
  id?: string;
}): Promise<{ isValid: boolean; errors: string[]; warnings: string[]; button: Button }> {
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
export function createStandardSubmitButton(options: {
  id?: string;
  hasIcon?: boolean;
} = {}): CreateButtonInput {
  const useCase = getCreateButtonUseCase();
  return useCase.createStandardSubmitButton(options);
}

/**
 * Creates a standard cancel button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard cancel button
 */
export function createStandardCancelButton(options: {
  id?: string;
  hasIcon?: boolean;
} = {}): CreateButtonInput {
  const useCase = getCreateButtonUseCase();
  return useCase.createStandardCancelButton(options);
}

/**
 * Creates a standard primary action button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard primary button
 */
export function createStandardPrimaryButton(options: {
  id?: string;
  hasIcon?: boolean;
  iconPosition?: 'start' | 'end';
} = {}): CreateButtonInput {
  const useCase = getCreateButtonUseCase();
  return useCase.createStandardPrimaryButton(options);
}

/**
 * Creates a standard secondary action button using DDD
 * @param options Additional options
 * @returns CreateButtonInput for standard secondary button
 */
export function createStandardSecondaryButton(options: {
  id?: string;
  hasIcon?: boolean;
  iconPosition?: 'start' | 'end';
} = {}): CreateButtonInput {
  const useCase = getCreateButtonUseCase();
  return useCase.createStandardSecondaryButton(options);
}

/**
 * Converts DDD Button entity back to legacy format
 * @param button DDD Button entity
 * @returns Legacy button format
 */
export function convertButtonToLegacy(button: Button): {
  buttonType: string;
  emphasis: string;
  hasIcon: boolean;
  iconPosition: 'start' | 'end';
  state: string;
  isAccessible: boolean;
  clickCount: number;
} {
  // Map new emphasis enum to legacy string
  const emphasisMap: Record<ButtonEmphasis, string> = {
    [ButtonEmphasis.LOW]: 'low',
    [ButtonEmphasis.MEDIUM]: 'medium',
    [ButtonEmphasis.HIGH]: 'high'
  };

  // Map new state enum to legacy string
  const stateMap: Record<string, string> = {
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
export function isValidButtonConfiguration(config: any): boolean {
  try {
    const button = createButtonDDD(config);
    const accessibilityResult = button.validateAccessibility();
    return accessibilityResult.isAccessible;
  } catch (error) {
    return false;
  }
}

// =================================================================
// LEGACY UTILITY FUNCTIONS (Deprecated)
// =================================================================

// Quick access to standard button configurations (deprecated - use DDD services)
export function getStandardButtonConfigs() {
  return {
    submit: { buttonType: 'submit', emphasis: 'high' },
    cancel: { buttonType: 'button', emphasis: 'low' },
    primary: { buttonType: 'button', emphasis: 'high' },
    secondary: { buttonType: 'button', emphasis: 'medium' }
  };
}
