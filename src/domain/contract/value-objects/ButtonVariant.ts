// contract-packages/agnostic-ui-contract-button/src/domain/contract/value-objects/ButtonVariant.ts

import { ValueObject } from '../../shared/ValueObject';

/**
 * Button Variant Value Object
 * Represents a button variant type with its values following DDD patterns
 */
export class ButtonVariant extends ValueObject<ButtonVariantData> {
  private constructor(private readonly _data: ButtonVariantData) {
    super(_data);
    this.validate();
  }

  /**
   * Creates a new ButtonVariant instance
   */
  static create(type: string, values: string[]): ButtonVariant {
    return new ButtonVariant({ type, values });
  }

  /**
   * Validates the variant data
   */
  private validate(): void {
    if (!this._data.type || typeof this._data.type !== 'string') {
      throw new Error('Button variant type must be a non-empty string');
    }

    if (!Array.isArray(this._data.values) || this._data.values.length === 0) {
      throw new Error('Button variant must have at least one value');
    }

    // Validate type
    const validTypes = ['size', 'intent', 'tone', 'emphasis'];
    if (!validTypes.includes(this._data.type)) {
      throw new Error(`Invalid button variant type: ${this._data.type}. Must be one of: ${validTypes.join(', ')}`);
    }

    // Validate values
    this._data.values.forEach(value => {
      if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error('Button variant values must be non-empty strings');
      }
    });
  }

  /**
   * Checks if a value exists in this variant
   */
  hasValue(value: string): boolean {
    return this._data.values.includes(value);
  }

  /**
   * Gets all values for this variant
   */
  get values(): readonly string[] {
    return [...this._data.values];
  }

  /**
   * Gets the variant type
   */
  get type(): string {
    return this._data.type;
  }

  /**
   * Gets the default value (first value)
   */
  get defaultValue(): string | undefined {
    return this._data.values[0];
  }

  /**
   * Creates a size variant
   */
  static createSizeVariant(values: string[] = ['xs', 'sm', 'md', 'lg', 'xl']): ButtonVariant {
    return ButtonVariant.create('size', values);
  }

  /**
   * Creates an intent variant
   */
  static createIntentVariant(values: string[] = ['primary', 'secondary', 'success', 'warning', 'error', 'info']): ButtonVariant {
    return ButtonVariant.create('intent', values);
  }

  /**
   * Creates a tone variant
   */
  static createToneVariant(values: string[] = ['subtle', 'normal', 'strong']): ButtonVariant {
    return ButtonVariant.create('tone', values);
  }

  /**
   * Creates an emphasis variant
   */
  static createEmphasisVariant(values: string[] = ['low', 'medium', 'high']): ButtonVariant {
    return ButtonVariant.create('emphasis', values);
  }

  toString(): string {
    return JSON.stringify(this._data);
  }
}

/**
 * Button Variant Data Interface
 */
export interface ButtonVariantData {
  type: string;
  values: string[];
}
