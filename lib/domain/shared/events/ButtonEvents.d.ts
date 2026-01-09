/**
 * Button Contract Created Event
 * Fired when a new button contract is created
 */
export declare class ButtonContractCreatedEvent {
    readonly contractId: string;
    readonly contractName: string;
    readonly timestamp: Date;
    constructor(contractId: string, contractName: string, timestamp?: Date);
}
/**
 * Button State Changed Event
 * Fired when button state changes
 */
export declare class ButtonStateChangedEvent {
    readonly buttonId: string;
    readonly previousState: string;
    readonly newState: string;
    readonly timestamp: Date;
    constructor(buttonId: string, previousState: string, newState: string, timestamp?: Date);
}
/**
 * Button Clicked Event
 * Fired when button is clicked
 */
export declare class ButtonClickedEvent {
    readonly buttonId: string;
    readonly clickType: 'primary' | 'secondary' | 'keyboard';
    readonly timestamp: Date;
    constructor(buttonId: string, clickType: 'primary' | 'secondary' | 'keyboard', timestamp?: Date);
}
/**
 * Button Accessibility Validated Event
 * Fired after accessibility validation
 */
export declare class ButtonAccessibilityValidatedEvent {
    readonly buttonId: string;
    readonly isAccessible: boolean;
    readonly violations: string[];
    readonly timestamp: Date;
    constructor(buttonId: string, isAccessible: boolean, violations: string[], timestamp?: Date);
}
/**
 * Button Domain Event Union Type
 */
export type ButtonDomainEvent = ButtonContractCreatedEvent | ButtonStateChangedEvent | ButtonClickedEvent | ButtonAccessibilityValidatedEvent;
//# sourceMappingURL=ButtonEvents.d.ts.map