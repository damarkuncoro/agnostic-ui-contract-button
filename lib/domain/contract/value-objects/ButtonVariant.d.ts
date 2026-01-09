import { ValueObject } from '../../shared/ValueObject';
/**
 * Button Variant Value Object
 * Represents a button variant type with its values following DDD patterns
 */
export declare class ButtonVariant extends ValueObject<ButtonVariantData> {
    private readonly _data;
    private constructor();
    /**
     * Creates a new ButtonVariant instance
     */
    static create(type: string, values: string[]): ButtonVariant;
    /**
     * Validates the variant data
     */
    private validate;
    /**
     * Checks if a value exists in this variant
     */
    hasValue(value: string): boolean;
    /**
     * Gets all values for this variant
     */
    get values(): readonly string[];
    /**
     * Gets the variant type
     */
    get type(): string;
    /**
     * Gets the default value (first value)
     */
    get defaultValue(): string | undefined;
    /**
     * Creates a size variant
     */
    static createSizeVariant(values?: string[]): ButtonVariant;
    /**
     * Creates an intent variant
     */
    static createIntentVariant(values?: string[]): ButtonVariant;
    /**
     * Creates a tone variant
     */
    static createToneVariant(values?: string[]): ButtonVariant;
    /**
     * Creates an emphasis variant
     */
    static createEmphasisVariant(values?: string[]): ButtonVariant;
    toString(): string;
}
/**
 * Button Variant Data Interface
 */
export interface ButtonVariantData {
    type: string;
    values: string[];
}
//# sourceMappingURL=ButtonVariant.d.ts.map