// contract-packages/agnostic-ui-contract-button/src/domain/shared/events/ButtonEvents.ts

/**
 * Button Contract Created Event
 * Fired when a new button contract is created
 */
export class ButtonContractCreatedEvent {
  constructor(
    public readonly contractId: string,
    public readonly contractName: string,
    public readonly timestamp: Date = new Date()
  ) {}
}

/**
 * Button State Changed Event
 * Fired when button state changes
 */
export class ButtonStateChangedEvent {
  constructor(
    public readonly buttonId: string,
    public readonly previousState: string,
    public readonly newState: string,
    public readonly timestamp: Date = new Date()
  ) {}
}

/**
 * Button Clicked Event
 * Fired when button is clicked
 */
export class ButtonClickedEvent {
  constructor(
    public readonly buttonId: string,
    public readonly clickType: 'primary' | 'secondary' | 'keyboard',
    public readonly timestamp: Date = new Date()
  ) {}
}

/**
 * Button Accessibility Validated Event
 * Fired after accessibility validation
 */
export class ButtonAccessibilityValidatedEvent {
  constructor(
    public readonly buttonId: string,
    public readonly isAccessible: boolean,
    public readonly violations: string[],
    public readonly timestamp: Date = new Date()
  ) {}
}

/**
 * Button Domain Event Union Type
 */
export type ButtonDomainEvent =
  | ButtonContractCreatedEvent
  | ButtonStateChangedEvent
  | ButtonClickedEvent
  | ButtonAccessibilityValidatedEvent;
