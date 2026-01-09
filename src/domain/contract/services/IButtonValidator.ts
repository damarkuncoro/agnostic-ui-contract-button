// contract-packages/agnostic-ui-contract-button/src/domain/contract/services/IButtonValidator.ts

import { ButtonContract } from '../entities/ButtonContract';

/**
 * Button Validator Interface
 *
 * Domain Services - Why It Matters:
 * Domain Services contain business logic that doesn't naturally belong to
 * entities or value objects. They orchestrate complex operations across
 * multiple domain objects while keeping business rules centralized.
 */
export interface IButtonValidator {
  /**
   * Validates a button contract
   */
  validate(
    contract: ButtonContract,
    context?: any
  ): Promise<{ isValid: boolean; errors: string[]; warnings: string[] }>;

  /**
   * Gets the validator name
   */
  getName(): string;

  /**
   * Gets the validator description
   */
  getDescription(): string;

  /**
   * Checks if this validator supports a validation type
   */
  supportsValidationType(type: string): boolean;

  /**
   * Gets the validation priority (higher = runs first)
   */
  getPriority(): number;
}