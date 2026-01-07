import { Button } from '../../domain/button/entities/Button';
import { IButtonValidator } from '../../domain/button/services/IButtonValidator';
/**
 * Button Accessibility Validator
 * Validates button accessibility compliance according to WCAG guidelines
 */
export declare class ButtonAccessibilityValidator implements IButtonValidator {
    getName(): string;
    getDescription(): string;
    validate(button: Button, context?: any): Promise<{
        isValid: boolean;
        errors: string[];
        warnings: string[];
    }>;
    supportsValidationType(type: string): boolean;
    getPriority(): number;
    /**
     * Validates keyboard navigation compliance
     */
    private validateKeyboardNavigation;
    /**
     * Validates screen reader support
     */
    private validateScreenReaderSupport;
    /**
     * Validates color contrast requirements
     */
    private validateColorContrast;
    /**
     * Validates focus management
     */
    private validateFocusManagement;
    /**
     * Validates semantic meaning
     */
    private validateSemanticMeaning;
}
//# sourceMappingURL=ButtonAccessibilityValidator.d.ts.map