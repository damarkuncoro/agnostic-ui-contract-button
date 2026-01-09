"use strict";
// contract-packages/agnostic-ui-contract-button/src/domain/shared/events/ButtonEvents.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonAccessibilityValidatedEvent = exports.ButtonClickedEvent = exports.ButtonStateChangedEvent = exports.ButtonContractCreatedEvent = void 0;
/**
 * Button Contract Created Event
 * Fired when a new button contract is created
 */
class ButtonContractCreatedEvent {
    constructor(contractId, contractName, timestamp = new Date()) {
        this.contractId = contractId;
        this.contractName = contractName;
        this.timestamp = timestamp;
    }
}
exports.ButtonContractCreatedEvent = ButtonContractCreatedEvent;
/**
 * Button State Changed Event
 * Fired when button state changes
 */
class ButtonStateChangedEvent {
    constructor(buttonId, previousState, newState, timestamp = new Date()) {
        this.buttonId = buttonId;
        this.previousState = previousState;
        this.newState = newState;
        this.timestamp = timestamp;
    }
}
exports.ButtonStateChangedEvent = ButtonStateChangedEvent;
/**
 * Button Clicked Event
 * Fired when button is clicked
 */
class ButtonClickedEvent {
    constructor(buttonId, clickType, timestamp = new Date()) {
        this.buttonId = buttonId;
        this.clickType = clickType;
        this.timestamp = timestamp;
    }
}
exports.ButtonClickedEvent = ButtonClickedEvent;
/**
 * Button Accessibility Validated Event
 * Fired after accessibility validation
 */
class ButtonAccessibilityValidatedEvent {
    constructor(buttonId, isAccessible, violations, timestamp = new Date()) {
        this.buttonId = buttonId;
        this.isAccessible = isAccessible;
        this.violations = violations;
        this.timestamp = timestamp;
    }
}
exports.ButtonAccessibilityValidatedEvent = ButtonAccessibilityValidatedEvent;
