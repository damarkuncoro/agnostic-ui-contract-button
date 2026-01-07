// contract-packages/agnostic-ui-contract-button/src/infrastructure/validators/ButtonAccessibilityValidator.ts

import { Button, ButtonState, ButtonEmphasis } from '../../domain/button/entities/Button';
import { IButtonValidator } from '../../domain/button/services/IButtonValidator';

/**
 * Button Accessibility Validator
 * Validates button accessibility compliance according to WCAG guidelines
 */
export class ButtonAccessibilityValidator implements IButtonValidator {
  getName(): string {
    return 'accessibility-validator';
  }

  getDescription(): string {
    return 'Validates button accessibility compliance with WCAG guidelines';
  }

  async validate(
    button: Button,
    context?: any
  ): Promise<{ isValid: boolean; errors: string[]; warnings: string[] }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // WCAG 2.1 AA compliance checks
    this.validateKeyboardNavigation(button, errors, warnings);
    this.validateScreenReaderSupport(button, errors, warnings);
    this.validateColorContrast(button, errors, warnings);
    this.validateFocusManagement(button, errors, warnings);
    this.validateSemanticMeaning(button, errors, warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  supportsValidationType(type: string): boolean {
    return [
      'accessibility',
      'wcag',
      'keyboard',
      'screen-reader',
      'focus',
      'semantic'
    ].includes(type);
  }

  getPriority(): number {
    return 100; // High priority for accessibility
  }

  /**
   * Validates keyboard navigation compliance
   */
  private validateKeyboardNavigation(button: Button, errors: string[], warnings: string[]): void {
    // Check if disabled buttons are properly handled
    if (button.isDisabled) {
      warnings.push('Disabled buttons should be removed from tab order');
    }

    // Check if loading buttons have proper keyboard handling
    if (button.isLoading) {
      warnings.push('Loading buttons should prevent multiple rapid clicks');
    }

    // High emphasis buttons should be easily keyboard accessible
    if (button.isHighEmphasis && !button.isAccessible) {
      errors.push('High emphasis buttons must be keyboard accessible');
    }
  }

  /**
   * Validates screen reader support
   */
  private validateScreenReaderSupport(button: Button, errors: string[], warnings: string[]): void {
    // Buttons with icons need proper labeling
    if (button.hasIcon && !button.isAccessible) {
      errors.push('Buttons with icons must have accessible labels for screen readers');
    }

    // Check button type semantic meaning
    if (button.buttonType.isSubmit()) {
      warnings.push('Submit buttons should have clear purpose indication for screen readers');
    }

    if (button.buttonType.isReset()) {
      warnings.push('Reset buttons should warn users about data loss for screen readers');
    }
  }

  /**
   * Validates color contrast requirements
   */
  private validateColorContrast(button: Button, errors: string[], warnings: string[]): void {
    // Different emphasis levels have different contrast requirements
    switch (button.emphasis) {
      case ButtonEmphasis.HIGH:
        // High emphasis buttons need 4.5:1 contrast ratio
        if (!button.isAccessible) {
          errors.push('High emphasis buttons must meet 4.5:1 contrast ratio');
        }
        break;
      case ButtonEmphasis.MEDIUM:
        // Medium emphasis buttons need 3:1 contrast ratio
        warnings.push('Medium emphasis buttons should meet 3:1 contrast ratio');
        break;
      case ButtonEmphasis.LOW:
        // Low emphasis buttons need 1.5:1 contrast ratio minimum
        warnings.push('Low emphasis buttons should meet minimum 1.5:1 contrast ratio');
        break;
    }
  }

  /**
   * Validates focus management
   */
  private validateFocusManagement(button: Button, errors: string[], warnings: string[]): void {
    // Focus should be visible
    if (button.state === ButtonState.FOCUSED && !button.isAccessible) {
      errors.push('Focused buttons must have visible focus indicators');
    }

    // Focus should not be trapped
    if (button.isDisabled && button.state === ButtonState.FOCUSED) {
      errors.push('Disabled buttons should not receive focus');
    }
  }

  /**
   * Validates semantic meaning
   */
  private validateSemanticMeaning(button: Button, errors: string[], warnings: string[]): void {
    // Button type should match semantic purpose
    if (button.buttonType.isSubmit() && button.emphasis === ButtonEmphasis.LOW) {
      warnings.push('Submit buttons should not have low visual emphasis');
    }

    // Icon position should be semantically clear
    if (button.hasIcon) {
      if (button.iconPosition === 'start') {
        warnings.push('Start-positioned icons should not change button meaning');
      }
    }

    // State changes should be communicated
    if (button.isLoading) {
      warnings.push('Loading state should be communicated to assistive technologies');
    }
  }
}