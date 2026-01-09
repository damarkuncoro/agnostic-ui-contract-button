import { ValueObject } from '../ValueObject';
/**
 * Button Type Value Object
 * Represents the different types of buttons with validation
 */
export declare class ButtonType extends ValueObject<string> {
    private constructor();
    /**
     * Creates a new ButtonType instance
     * @param value The button type to validate
     * @returns ButtonType instance
     * @throws Error if validation fails
     */
    static create(value: string): ButtonType;
    /**
     * Creates ButtonType from string (alias for create)
     * @param value The button type string
     * @returns ButtonType instance
     */
    static fromString(value: string): ButtonType;
    /**
     * Validates the button type
     * @private
     */
    private validate;
    /**
     * Gets the button type value
     */
    get value(): string;
    /**
     * Checks if this is a submit button
     */
    isSubmit(): boolean;
    /**
     * Checks if this is a reset button
     */
    isReset(): boolean;
    /**
     * Checks if this is a regular button
     */
    isButton(): boolean;
    /**
     * Gets the default form method for this button type
     */
    getDefaultFormMethod(): 'get' | 'post';
    /**
     * Gets the semantic role for this button type
     */
    getSemanticRole(): string;
    toString(): string;
}
//# sourceMappingURL=ButtonType.d.ts.map