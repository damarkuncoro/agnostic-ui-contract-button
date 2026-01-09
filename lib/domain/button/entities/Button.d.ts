import { BaseEntity } from '../../shared/BaseEntity';
import { ButtonType } from '../../shared/value-objects/ButtonType';
/**
 * Button State enumeration
 */
export declare enum ButtonState {
    IDLE = "idle",
    HOVERED = "hovered",
    PRESSED = "pressed",
    FOCUSED = "focused",
    DISABLED = "disabled",
    LOADING = "loading"
}
/**
 * Button Emphasis enumeration
 */
export declare enum ButtonEmphasis {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
/**
 * Button Entity
 * Represents a button component with its business logic and state management
 */
export declare class Button extends BaseEntity {
    private _buttonType;
    private _state;
    private _emphasis;
    private _hasIcon;
    private _iconPosition;
    private _isAccessible;
    private _clickCount;
    private _lastClickedAt?;
    private _accessibilityViolations;
    protected domainEvents: any[];
    private constructor();
    /**
     * Creates a new Button instance
     */
    static create(params: {
        id?: string;
        buttonType: string;
        emphasis?: ButtonEmphasis;
        hasIcon?: boolean;
        iconPosition?: 'start' | 'end';
    }): Button;
    /**
     * Simulates a button click
     */
    click(clickType?: 'primary' | 'secondary' | 'keyboard'): void;
    /**
     * Changes the button state
     */
    changeState(newState: ButtonState): void;
    /**
     * Sets the button emphasis
     */
    setEmphasis(emphasis: ButtonEmphasis): void;
    /**
     * Adds an icon to the button
     */
    addIcon(position?: 'start' | 'end'): void;
    /**
     * Removes the icon from the button
     */
    removeIcon(): void;
    /**
     * Validates accessibility compliance
     */
    validateAccessibility(): {
        isAccessible: boolean;
        violations: string[];
    };
    /**
     * Gets button statistics
     */
    getStatistics(): {
        clickCount: number;
        lastClickedAt?: Date;
        averageClicksPerDay: number;
        isPopular: boolean;
    };
    /**
     * Checks if the button can be clicked
     */
    canBeClicked(): boolean;
    /**
     * Checks if the button needs accessibility improvements
     */
    needsAccessibilityImprovement(): boolean;
    /**
     * Validates business rules
     */
    private validateBusinessRules;
    /**
     * Validates state transitions
     */
    private validateStateTransition;
    /**
     * Gets and clears domain events
     */
    getDomainEvents(): any[];
    /**
     * Adds a domain event
     */
    protected addDomainEvent(event: any): void;
    get buttonType(): ButtonType;
    get state(): ButtonState;
    get emphasis(): ButtonEmphasis;
    get hasIcon(): boolean;
    get iconPosition(): 'start' | 'end';
    get isAccessible(): boolean;
    get clickCount(): number;
    get lastClickedAt(): Date | undefined;
    get accessibilityViolations(): readonly string[];
    get isIdle(): boolean;
    get isDisabled(): boolean;
    get isLoading(): boolean;
    get isHighEmphasis(): boolean;
}
//# sourceMappingURL=Button.d.ts.map