"use strict";
// contract-packages/agnostic-ui-contract-button/src/domain/shared/events/DomainEvent.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonAccessibilityValidatedEvent = exports.ButtonStateChangedEvent = exports.ButtonClickedEvent = exports.ButtonCreatedEvent = exports.ButtonDomainEvent = void 0;
/**
 * Base Domain Event for button operations
 */
class ButtonDomainEvent {
    constructor() {
        this.occurredOn = new Date();
        this.eventId = crypto.randomUUID();
    }
}
exports.ButtonDomainEvent = ButtonDomainEvent;
class ButtonCreatedEvent extends ButtonDomainEvent {
    constructor(buttonId, buttonType, hasIcon) {
        super();
        this.buttonId = buttonId;
        this.buttonType = buttonType;
        this.hasIcon = hasIcon;
    }
    get eventType() {
        return 'ButtonCreated';
    }
}
exports.ButtonCreatedEvent = ButtonCreatedEvent;
class ButtonClickedEvent extends ButtonDomainEvent {
    constructor(buttonId, clickType) {
        super();
        this.buttonId = buttonId;
        this.clickType = clickType;
    }
    get eventType() {
        return 'ButtonClicked';
    }
}
exports.ButtonClickedEvent = ButtonClickedEvent;
class ButtonStateChangedEvent extends ButtonDomainEvent {
    constructor(buttonId, previousState, newState) {
        super();
        this.buttonId = buttonId;
        this.previousState = previousState;
        this.newState = newState;
    }
    get eventType() {
        return 'ButtonStateChanged';
    }
}
exports.ButtonStateChangedEvent = ButtonStateChangedEvent;
class ButtonAccessibilityValidatedEvent extends ButtonDomainEvent {
    constructor(buttonId, isAccessible, violations) {
        super();
        this.buttonId = buttonId;
        this.isAccessible = isAccessible;
        this.violations = violations;
    }
    get eventType() {
        return 'ButtonAccessibilityValidated';
    }
}
exports.ButtonAccessibilityValidatedEvent = ButtonAccessibilityValidatedEvent;
//# sourceMappingURL=DomainEvent.js.map