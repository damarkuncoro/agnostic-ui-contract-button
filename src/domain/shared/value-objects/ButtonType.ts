// contract-packages/agnostic-ui-contract-button/src/domain/shared/value-objects/ButtonType.ts

import { ValueObject } from '../ValueObject';

/**
 * Button Type Value Object
 * Represents the different types of buttons with validation
 */
export class ButtonType extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
    this.validate();
  }

  /**
   * Creates a new ButtonType instance
   * @param value The button type to validate
   * @returns ButtonType instance
   * @throws Error if validation fails
   */
  static create(value: string): ButtonType {
    return new ButtonType(value);
  }

  /**
   * Creates ButtonType from string (alias for create)
   * @param value The button type string
   * @returns ButtonType instance
   */
  static fromString(value: string): ButtonType {
    return ButtonType.create(value);
  }

  /**
   * Validates the button type
   * @private
   */
  private validate(): void {
    if (!this._value || typeof this._value !== 'string') {
      throw new Error('Button type must be a non-empty string');
    }

    const validTypes = ['button', 'submit', 'reset'];
    if (!validTypes.includes(this._value)) {
      throw new Error(`Invalid button type: ${this._value}. Must be one of: ${validTypes.join(', ')}`);
    }
  }

  /**
   * Gets the button type value
   */
  get value(): string {
    return this._value;
  }

  /**
   * Checks if this is a submit button
   */
  isSubmit(): boolean {
    return this._value === 'submit';
  }

  /**
   * Checks if this is a reset button
   */
  isReset(): boolean {
    return this._value === 'reset';
  }

  /**
   * Checks if this is a regular button
   */
  isButton(): boolean {
    return this._value === 'button';
  }

  /**
   * Gets the default form method for this button type
   */
  getDefaultFormMethod(): 'get' | 'post' {
    return this.isSubmit() ? 'post' : 'get';
  }

  /**
   * Gets the semantic role for this button type
   */
  getSemanticRole(): string {
    switch (this._value) {
      case 'submit':
        return 'primary-action';
      case 'reset':
        return 'secondary-action';
      case 'button':
      default:
        return 'neutral-action';
    }
  }

  toString(): string {
    return this._value;
  }
}