import type { UiBoxVariant, UiBoxStateVariant, UiBoxLayoutVariant, UiBoxTone } from "@damarkuncoro/agnostic-ui-contract-box";
export interface UiButtonVariant extends UiBoxVariant, UiBoxStateVariant, UiBoxLayoutVariant {
    emphasis?: "low" | "medium" | "high";
}
export type UiButtonType = "button" | "submit" | "reset";
export declare const uiButtonTypes: UiButtonType[];
export interface UiButtonIconVariant {
    hasIcon?: boolean;
    iconPosition?: "start" | "end";
}
export interface UiButtonVariantExtended extends UiButtonVariant, UiButtonIconVariant {
    type?: UiButtonType;
    tone?: UiBoxTone;
}
//# sourceMappingURL=variant.d.ts.map