// contract-packages/agnostic-ui-contract-button/src/domain/shared/events/DomainEvent.ts

/**
 * Base Domain Event for button operations
 */
export abstract class ButtonDomainEvent {
  public readonly occurredOn: Date;
  public readonly eventId: string;

  constructor() {
    this.occurredOn = new Date();
    this.eventId = crypto.randomUUID();
  }

  abstract get eventType(): string;
}

export class ButtonCreatedEvent extends ButtonDomainEvent {
  constructor(
    public readonly buttonId: string,
    public readonly buttonType: string,
    public readonly hasIcon: boolean
  ) {
    super();
  }

  get eventType(): string {
    return 'ButtonCreated';
  }
}

export class ButtonClickedEvent extends ButtonDomainEvent {
  constructor(
    public readonly buttonId: string,
    public readonly clickType: 'primary' | 'secondary' | 'keyboard'
  ) {
    super();
  }

  get eventType(): string {
    return 'ButtonClicked';
  }
}

export class ButtonStateChangedEvent extends ButtonDomainEvent {
  constructor(
    public readonly buttonId: string,
    public readonly previousState: string,
    public readonly newState: string
  ) {
    super();
  }

  get eventType(): string {
    return 'ButtonStateChanged';
  }
}

export class ButtonAccessibilityValidatedEvent extends ButtonDomainEvent {
  constructor(
    public readonly buttonId: string,
    public readonly isAccessible: boolean,
    public readonly violations: string[]
  ) {
    super();
  }

  get eventType(): string {
    return 'ButtonAccessibilityValidated';
  }
}