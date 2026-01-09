"use strict";
// contract-packages/agnostic-ui-contract-button/src/domain/contract/value-objects/ButtonVariant.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonVariant = void 0;
const ValueObject_1 = require("../../shared/ValueObject");
/**
 * Button Variant Value Object
 * Represents a button variant type with its values following DDD patterns
 */
class ButtonVariant extends ValueObject_1.ValueObject {
    constructor(_data) {
        super(_data);
        this._data = _data;
        this.validate();
    }
    /**
     * Creates a new ButtonVariant instance
     */
    static create(type, values) {
        return new ButtonVariant({ type, values });
    }
    /**
     * Validates the variant data
     */
    validate() {
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
    hasValue(value) {
        return this._data.values.includes(value);
    }
    /**
     * Gets all values for this variant
     */
    get values() {
        return [...this._data.values];
    }
    /**
     * Gets the variant type
     */
    get type() {
        return this._data.type;
    }
    /**
     * Gets the default value (first value)
     */
    get defaultValue() {
        return this._data.values[0];
    }
    /**
     * Creates a size variant
     */
    static createSizeVariant(values = ['xs', 'sm', 'md', 'lg', 'xl']) {
        return ButtonVariant.create('size', values);
    }
    /**
     * Creates an intent variant
     */
    static createIntentVariant(values = ['primary', 'secondary', 'success', 'warning', 'error', 'info']) {
        return ButtonVariant.create('intent', values);
    }
    /**
     * Creates a tone variant
     */
    static createToneVariant(values = ['subtle', 'normal', 'strong']) {
        return ButtonVariant.create('tone', values);
    }
    /**
     * Creates an emphasis variant
     */
    static createEmphasisVariant(values = ['low', 'medium', 'high']) {
        return ButtonVariant.create('emphasis', values);
    }
    toString() {
        return JSON.stringify(this._data);
    }
}
exports.ButtonVariant = ButtonVariant;
