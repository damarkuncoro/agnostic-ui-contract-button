/**
 * Base Domain Event for button operations
 */
export declare abstract class ButtonDomainEvent {
    readonly occurredOn: Date;
    readonly eventId: string;
    constructor();
    abstract get eventType(): string;
}
export declare class ButtonCreatedEvent extends ButtonDomainEvent {
    readonly buttonId: string;
    readonly buttonType: string;
    readonly hasIcon: boolean;
    constructor(buttonId: string, buttonType: string, hasIcon: boolean);
    get eventType(): string;
}
export declare class ButtonClickedEvent extends ButtonDomainEvent {
    readonly buttonId: string;
    readonly clickType: 'primary' | 'secondary' | 'keyboard';
    constructor(buttonId: string, clickType: 'primary' | 'secondary' | 'keyboard');
    get eventType(): string;
}
export declare class ButtonStateChangedEvent extends ButtonDomainEvent {
    readonly buttonId: string;
    readonly previousState: string;
    readonly newState: string;
    constructor(buttonId: string, previousState: string, newState: string);
    get eventType(): string;
}
export declare class ButtonAccessibilityValidatedEvent extends ButtonDomainEvent {
    readonly buttonId: string;
    readonly isAccessible: boolean;
    readonly violations: string[];
    constructor(buttonId: string, isAccessible: boolean, violations: string[]);
    get eventType(): string;
}
//# sourceMappingURL=DomainEvent.d.ts.map