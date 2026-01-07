"use strict";
// contract-packages/agnostic-ui-contract-button/src/domain/button/entities/Button.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.ButtonEmphasis = exports.ButtonState = void 0;
const BaseEntity_1 = require("../../shared/BaseEntity");
const ButtonType_1 = require("../../shared/value-objects/ButtonType");
const DomainEvent_1 = require("../../shared/events/DomainEvent");
/**
 * Button State enumeration
 */
var ButtonState;
(function (ButtonState) {
    ButtonState["IDLE"] = "idle";
    ButtonState["HOVERED"] = "hovered";
    ButtonState["PRESSED"] = "pressed";
    ButtonState["FOCUSED"] = "focused";
    ButtonState["DISABLED"] = "disabled";
    ButtonState["LOADING"] = "loading";
})(ButtonState || (exports.ButtonState = ButtonState = {}));
/**
 * Button Emphasis enumeration
 */
var ButtonEmphasis;
(function (ButtonEmphasis) {
    ButtonEmphasis["LOW"] = "low";
    ButtonEmphasis["MEDIUM"] = "medium";
    ButtonEmphasis["HIGH"] = "high";
})(ButtonEmphasis || (exports.ButtonEmphasis = ButtonEmphasis = {}));
/**
 * Button Entity
 * Represents a button component with its business logic and state management
 */
class Button extends BaseEntity_1.BaseEntity {
    constructor(id, buttonType, emphasis = ButtonEmphasis.MEDIUM) {
        super(id);
        this.domainEvents = [];
        this._buttonType = buttonType;
        this._state = ButtonState.IDLE;
        this._emphasis = emphasis;
        this._hasIcon = false;
        this._iconPosition = 'start';
        this._isAccessible = false;
        this._clickCount = 0;
        this._accessibilityViolations = [];
        this.validateBusinessRules();
    }
    /**
     * Creates a new Button instance
     */
    static create(params) {
        const buttonId = params.id || crypto.randomUUID();
        const buttonType = ButtonType_1.ButtonType.create(params.buttonType);
        const emphasis = params.emphasis || ButtonEmphasis.MEDIUM;
        const button = new Button(buttonId, buttonType, emphasis);
        // Set optional properties
        if (params.hasIcon !== undefined)
            button._hasIcon = params.hasIcon;
        if (params.iconPosition)
            button._iconPosition = params.iconPosition;
        // Emit creation event
        button.addDomainEvent(new DomainEvent_1.ButtonCreatedEvent(buttonId, params.buttonType, params.hasIcon || false));
        return button;
    }
    /**
     * Simulates a button click
     */
    click(clickType = 'primary') {
        if (this._state === ButtonState.DISABLED || this._state === ButtonState.LOADING) {
            throw new Error('Cannot click a disabled or loading button');
        }
        this._clickCount++;
        this._lastClickedAt = new Date();
        this.markAsModified();
        // Emit click event
        this.addDomainEvent(new DomainEvent_1.ButtonClickedEvent(this.id, clickType));
        // Business logic: High emphasis buttons get more attention
        if (this._emphasis === ButtonEmphasis.HIGH) {
            // Could trigger additional business logic here
        }
    }
    /**
     * Changes the button state
     */
    changeState(newState) {
        if (this._state === newState)
            return;
        const previousState = this._state;
        this._state = newState;
        this.markAsModified();
        // Validate state transitions
        this.validateStateTransition(previousState, newState);
        // Emit state change event
        this.addDomainEvent(new DomainEvent_1.ButtonStateChangedEvent(this.id, previousState, newState));
        // Business logic based on state
        if (newState === ButtonState.DISABLED) {
            this._isAccessible = false; // Disabled buttons are not accessible
        }
    }
    /**
     * Sets the button emphasis
     */
    setEmphasis(emphasis) {
        if (this._emphasis === emphasis)
            return;
        this._emphasis = emphasis;
        this.markAsModified();
        // Business logic: High emphasis buttons require accessibility
        if (emphasis === ButtonEmphasis.HIGH && !this._isAccessible) {
            this._accessibilityViolations.push('High emphasis buttons must be accessible');
        }
    }
    /**
     * Adds an icon to the button
     */
    addIcon(position = 'start') {
        this._hasIcon = true;
        this._iconPosition = position;
        this.markAsModified();
        // Business logic: Icons affect accessibility requirements
        if (!this._isAccessible) {
            this._accessibilityViolations.push('Buttons with icons must have proper accessibility labels');
        }
    }
    /**
     * Removes the icon from the button
     */
    removeIcon() {
        this._hasIcon = false;
        this.markAsModified();
        // Clean up accessibility violations related to icons
        this._accessibilityViolations = this._accessibilityViolations.filter(v => !v.includes('icons must have proper accessibility'));
    }
    /**
     * Validates accessibility compliance
     */
    validateAccessibility() {
        const violations = [];
        // Basic accessibility checks
        if (this._state === ButtonState.DISABLED && this._isAccessible) {
            violations.push('Disabled buttons cannot be marked as accessible');
        }
        if (this._hasIcon && !this._isAccessible) {
            violations.push('Buttons with icons must be accessible');
        }
        if (this._emphasis === ButtonEmphasis.HIGH && !this._isAccessible) {
            violations.push('High emphasis buttons must be accessible');
        }
        // Update internal state
        this._isAccessible = violations.length === 0;
        this._accessibilityViolations = violations;
        // Emit validation event
        this.addDomainEvent(new DomainEvent_1.ButtonAccessibilityValidatedEvent(this.id, this._isAccessible, violations));
        return {
            isAccessible: this._isAccessible,
            violations
        };
    }
    /**
     * Gets button statistics
     */
    getStatistics() {
        const daysSinceCreation = Math.max(1, Math.floor((Date.now() - this._createdAt.getTime()) / (1000 * 60 * 60 * 24)));
        const averageClicksPerDay = this._clickCount / daysSinceCreation;
        const isPopular = averageClicksPerDay > 10; // Arbitrary threshold
        return {
            clickCount: this._clickCount,
            lastClickedAt: this._lastClickedAt,
            averageClicksPerDay,
            isPopular
        };
    }
    /**
     * Checks if the button can be clicked
     */
    canBeClicked() {
        return this._state !== ButtonState.DISABLED && this._state !== ButtonState.LOADING;
    }
    /**
     * Checks if the button needs accessibility improvements
     */
    needsAccessibilityImprovement() {
        return this._accessibilityViolations.length > 0;
    }
    /**
     * Validates business rules
     */
    validateBusinessRules() {
        if (!this._buttonType) {
            throw new Error('Button must have a valid type');
        }
        // Business rule: Submit buttons should have high emphasis in forms
        if (this._buttonType.isSubmit() && this._emphasis === ButtonEmphasis.LOW) {
            throw new Error('Submit buttons should not have low emphasis');
        }
    }
    /**
     * Validates state transitions
     */
    validateStateTransition(from, to) {
        // Business rules for state transitions
        const invalidTransitions = [
            [ButtonState.DISABLED, ButtonState.HOVERED],
            [ButtonState.DISABLED, ButtonState.PRESSED],
            [ButtonState.LOADING, ButtonState.PRESSED]
        ];
        const isInvalid = invalidTransitions.some(([f, t]) => f === from && t === to);
        if (isInvalid) {
            throw new Error(`Invalid state transition: ${from} -> ${to}`);
        }
    }
    /**
     * Gets and clears domain events
     */
    getDomainEvents() {
        const events = [...this.domainEvents];
        this.domainEvents = [];
        return events;
    }
    /**
     * Adds a domain event
     */
    addDomainEvent(event) {
        this.domainEvents.push(event);
    }
    // Getters
    get buttonType() {
        return this._buttonType;
    }
    get state() {
        return this._state;
    }
    get emphasis() {
        return this._emphasis;
    }
    get hasIcon() {
        return this._hasIcon;
    }
    get iconPosition() {
        return this._iconPosition;
    }
    get isAccessible() {
        return this._isAccessible;
    }
    get clickCount() {
        return this._clickCount;
    }
    get lastClickedAt() {
        return this._lastClickedAt;
    }
    get accessibilityViolations() {
        return [...this._accessibilityViolations];
    }
    get isIdle() {
        return this._state === ButtonState.IDLE;
    }
    get isDisabled() {
        return this._state === ButtonState.DISABLED;
    }
    get isLoading() {
        return this._state === ButtonState.LOADING;
    }
    get isHighEmphasis() {
        return this._emphasis === ButtonEmphasis.HIGH;
    }
}
exports.Button = Button;
//# sourceMappingURL=Button.js.map