// contract-packages/agnostic-ui-contract-button/src/application/use-cases/CreateButtonUseCase.ts

import { Button, ButtonEmphasis } from '../../domain/button/entities/Button';
import { ButtonType } from '../../domain/shared/value-objects/ButtonType';
import { IButtonValidator } from '../../domain/button/services/IButtonValidator';

/**
 * Create Button Use Case
 * Orchestrates the creation of new button instances with validation
 */
export class CreateButtonUseCase {
  constructor(
    private readonly buttonValidators: IButtonValidator[]
  ) {}

  /**
   * Executes the create button use case
   */
  async execute(input: CreateButtonInput): Promise<CreateButtonOutput> {
    // Validate input
    this.validateInput(input);

    // Create button instance
    const button = Button.create({
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
  private validateInput(input: CreateButtonInput): void {
    if (!input.buttonType || typeof input.buttonType !== 'string') {
      throw new Error('Button type is required and must be a string');
    }

    // Validate button type
    try {
      ButtonType.create(input.buttonType);
    } catch (error) {
      throw new Error(`Invalid button type: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Validate emphasis
    if (input.emphasis !== undefined) {
      const validEmphases = Object.values(ButtonEmphasis);
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
  private async runButtonValidators(
    button: Button
  ): Promise<Array<{ validator: string; isValid: boolean; errors: string[]; warnings: string[] }>> {
    const results: Array<{ validator: string; isValid: boolean; errors: string[]; warnings: string[] }> = [];

    for (const validator of this.buttonValidators) {
      try {
        const result = await validator.validate(button);
        results.push({
          validator: validator.getName(),
          isValid: result.isValid,
          errors: result.errors,
          warnings: result.warnings
        });
      } catch (error) {
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
  getAvailableValidators(): string[] {
    return this.buttonValidators.map(v => v.getName());
  }

  /**
   * Checks if a validator is available
   */
  hasValidator(validatorName: string): boolean {
    return this.buttonValidators.some(v => v.getName() === validatorName);
  }

  /**
   * Gets validator description
   */
  getValidatorDescription(validatorName: string): string | undefined {
    const validator = this.buttonValidators.find(v => v.getName() === validatorName);
    return validator?.getDescription();
  }

  /**
   * Creates a standard submit button
   */
  createStandardSubmitButton(options: {
    id?: string;
    emphasis?: ButtonEmphasis;
    hasIcon?: boolean;
  } = {}): CreateButtonInput {
    return {
      buttonType: 'submit',
      emphasis: options.emphasis || ButtonEmphasis.HIGH,
      hasIcon: options.hasIcon || false,
      id: options.id
    };
  }

  /**
   * Creates a standard cancel button
   */
  createStandardCancelButton(options: {
    id?: string;
    emphasis?: ButtonEmphasis;
    hasIcon?: boolean;
  } = {}): CreateButtonInput {
    return {
      buttonType: 'button',
      emphasis: options.emphasis || ButtonEmphasis.LOW,
      hasIcon: options.hasIcon || false,
      id: options.id
    };
  }

  /**
   * Creates a standard primary action button
   */
  createStandardPrimaryButton(options: {
    id?: string;
    hasIcon?: boolean;
    iconPosition?: 'start' | 'end';
  } = {}): CreateButtonInput {
    return {
      buttonType: 'button',
      emphasis: ButtonEmphasis.HIGH,
      hasIcon: options.hasIcon || false,
      iconPosition: options.iconPosition || 'start',
      id: options.id
    };
  }

  /**
   * Creates a standard secondary action button
   */
  createStandardSecondaryButton(options: {
    id?: string;
    hasIcon?: boolean;
    iconPosition?: 'start' | 'end';
  } = {}): CreateButtonInput {
    return {
      buttonType: 'button',
      emphasis: ButtonEmphasis.MEDIUM,
      hasIcon: options.hasIcon || false,
      iconPosition: options.iconPosition || 'start',
      id: options.id
    };
  }
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
    domain: { isValid: boolean; errors: string[]; warnings: string[] };
    validators: Array<{ validator: string; isValid: boolean; errors: string[]; warnings: string[] }>;
    accessibility: { isAccessible: boolean; violations: string[] };
    combined: { isValid: boolean; errors: string[]; warnings: string[] };
  };
  domainEvents: any[];
}