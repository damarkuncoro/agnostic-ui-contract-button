// contract-packages/agnostic-ui-contract-button/src/domain/button/entities/Button.ts

import { BaseEntity } from '../../shared/BaseEntity';
import { ButtonType } from '../../shared/value-objects/ButtonType';
import {
  ButtonCreatedEvent,
  ButtonClickedEvent,
  ButtonStateChangedEvent,
  ButtonAccessibilityValidatedEvent
} from '../../shared/events/DomainEvent';

/**
 * Button State enumeration
 */
export enum ButtonState {
  IDLE = 'idle',
  HOVERED = 'hovered',
  PRESSED = 'pressed',
  FOCUSED = 'focused',
  DISABLED = 'disabled',
  LOADING = 'loading'
}

/**
 * Button Emphasis enumeration
 */
export enum ButtonEmphasis {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

/**
 * Button Entity
 * Represents a button component with its business logic and state management
 */
export class Button extends BaseEntity {
  private _buttonType: ButtonType;
  private _state: ButtonState;
  private _emphasis: ButtonEmphasis;
  private _hasIcon: boolean;
  private _iconPosition: 'start' | 'end';
  private _isAccessible: boolean;
  private _clickCount: number;
  private _lastClickedAt?: Date;
  private _accessibilityViolations: string[];

  protected domainEvents: any[] = [];

  private constructor(
    id: string,
    buttonType: ButtonType,
    emphasis: ButtonEmphasis = ButtonEmphasis.MEDIUM
  ) {
    super(id);
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
  static create(params: {
    id?: string;
    buttonType: string;
    emphasis?: ButtonEmphasis;
    hasIcon?: boolean;
    iconPosition?: 'start' | 'end';
  }): Button {
    const buttonId = params.id || crypto.randomUUID();
    const buttonType = ButtonType.create(params.buttonType);
    const emphasis = params.emphasis || ButtonEmphasis.MEDIUM;

    const button = new Button(buttonId, buttonType, emphasis);

    // Set optional properties
    if (params.hasIcon !== undefined) button._hasIcon = params.hasIcon;
    if (params.iconPosition) button._iconPosition = params.iconPosition;

    // Emit creation event
    button.addDomainEvent(new ButtonCreatedEvent(
      buttonId,
      params.buttonType,
      params.hasIcon || false
    ));

    return button;
  }

  /**
   * Simulates a button click
   */
  click(clickType: 'primary' | 'secondary' | 'keyboard' = 'primary'): void {
    if (this._state === ButtonState.DISABLED || this._state === ButtonState.LOADING) {
      throw new Error('Cannot click a disabled or loading button');
    }

    this._clickCount++;
    this._lastClickedAt = new Date();
    this.markAsModified();

    // Emit click event
    this.addDomainEvent(new ButtonClickedEvent(
      this.id,
      clickType
    ));

    // Business logic: High emphasis buttons get more attention
    if (this._emphasis === ButtonEmphasis.HIGH) {
      // Could trigger additional business logic here
    }
  }

  /**
   * Changes the button state
   */
  changeState(newState: ButtonState): void {
    if (this._state === newState) return;

    const previousState = this._state;
    this._state = newState;
    this.markAsModified();

    // Validate state transitions
    this.validateStateTransition(previousState, newState);

    // Emit state change event
    this.addDomainEvent(new ButtonStateChangedEvent(
      this.id,
      previousState,
      newState
    ));

    // Business logic based on state
    if (newState === ButtonState.DISABLED) {
      this._isAccessible = false; // Disabled buttons are not accessible
    }
  }

  /**
   * Sets the button emphasis
   */
  setEmphasis(emphasis: ButtonEmphasis): void {
    if (this._emphasis === emphasis) return;

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
  addIcon(position: 'start' | 'end' = 'start'): void {
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
  removeIcon(): void {
    this._hasIcon = false;
    this.markAsModified();

    // Clean up accessibility violations related to icons
    this._accessibilityViolations = this._accessibilityViolations.filter(
      v => !v.includes('icons must have proper accessibility')
    );
  }

  /**
   * Validates accessibility compliance
   */
  validateAccessibility(): { isAccessible: boolean; violations: string[] } {
    const violations: string[] = [];

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
    this.addDomainEvent(new ButtonAccessibilityValidatedEvent(
      this.id,
      this._isAccessible,
      violations
    ));

    return {
      isAccessible: this._isAccessible,
      violations
    };
  }

  /**
   * Gets button statistics
   */
  getStatistics(): {
    clickCount: number;
    lastClickedAt?: Date;
    averageClicksPerDay: number;
    isPopular: boolean;
  } {
    const daysSinceCreation = Math.max(1, Math.floor(
      (Date.now() - this._createdAt.getTime()) / (1000 * 60 * 60 * 24)
    ));

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
  canBeClicked(): boolean {
    return this._state !== ButtonState.DISABLED && this._state !== ButtonState.LOADING;
  }

  /**
   * Checks if the button needs accessibility improvements
   */
  needsAccessibilityImprovement(): boolean {
    return this._accessibilityViolations.length > 0;
  }

  /**
   * Validates business rules
   */
  private validateBusinessRules(): void {
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
  private validateStateTransition(from: ButtonState, to: ButtonState): void {
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
  public getDomainEvents(): any[] {
    const events = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }

  /**
   * Adds a domain event
   */
  protected addDomainEvent(event: any): void {
    this.domainEvents.push(event);
  }

  // Getters
  get buttonType(): ButtonType {
    return this._buttonType;
  }

  get state(): ButtonState {
    return this._state;
  }

  get emphasis(): ButtonEmphasis {
    return this._emphasis;
  }

  get hasIcon(): boolean {
    return this._hasIcon;
  }

  get iconPosition(): 'start' | 'end' {
    return this._iconPosition;
  }

  get isAccessible(): boolean {
    return this._isAccessible;
  }

  get clickCount(): number {
    return this._clickCount;
  }

  get lastClickedAt(): Date | undefined {
    return this._lastClickedAt;
  }

  get accessibilityViolations(): readonly string[] {
    return [...this._accessibilityViolations];
  }

  get isIdle(): boolean {
    return this._state === ButtonState.IDLE;
  }

  get isDisabled(): boolean {
    return this._state === ButtonState.DISABLED;
  }

  get isLoading(): boolean {
    return this._state === ButtonState.LOADING;
  }

  get isHighEmphasis(): boolean {
    return this._emphasis === ButtonEmphasis.HIGH;
  }
}