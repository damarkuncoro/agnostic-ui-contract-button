"use strict";
// contract-packages/agnostic-ui-contract-button/src/domain/shared/value-objects/ButtonType.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonType = void 0;
const ValueObject_1 = require("../ValueObject");
/**
 * Button Type Value Object
 * Represents the different types of buttons with validation
 */
class ButtonType extends ValueObject_1.ValueObject {
    constructor(value) {
        super(value);
        this.validate();
    }
    /**
     * Creates a new ButtonType instance
     * @param value The button type to validate
     * @returns ButtonType instance
     * @throws Error if validation fails
     */
    static create(value) {
        return new ButtonType(value);
    }
    /**
     * Creates ButtonType from string (alias for create)
     * @param value The button type string
     * @returns ButtonType instance
     */
    static fromString(value) {
        return ButtonType.create(value);
    }
    /**
     * Validates the button type
     * @private
     */
    validate() {
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
    get value() {
        return this._value;
    }
    /**
     * Checks if this is a submit button
     */
    isSubmit() {
        return this._value === 'submit';
    }
    /**
     * Checks if this is a reset button
     */
    isReset() {
        return this._value === 'reset';
    }
    /**
     * Checks if this is a regular button
     */
    isButton() {
        return this._value === 'button';
    }
    /**
     * Gets the default form method for this button type
     */
    getDefaultFormMethod() {
        return this.isSubmit() ? 'post' : 'get';
    }
    /**
     * Gets the semantic role for this button type
     */
    getSemanticRole() {
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
    toString() {
        return this._value;
    }
}
exports.ButtonType = ButtonType;
//# sourceMappingURL=ButtonType.js.map