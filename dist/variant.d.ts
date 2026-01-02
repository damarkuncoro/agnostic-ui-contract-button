import type { UiSizeVariant, UiIntentVariant, UiToneVariant, UiEmphasisVariant, UiVariantSize, UiVariantIntent, UiVariantTone, UiVariantEmphasis } from "@damarkuncoro/agnostic-ui-contract-core";
export type UiButtonSize = Extract<UiVariantSize, "xs" | "sm" | "md" | "lg" | "xl">;
export type UiButtonIntent = Extract<UiVariantIntent, "primary" | "secondary" | "success" | "warning" | "danger" | "neutral">;
export type UiButtonTone = UiVariantTone;
export type UiButtonEmphasis = Extract<UiVariantEmphasis, "low" | "medium" | "high">;
export declare const uiButtonSizes: UiButtonSize[];
export declare const uiButtonIntents: UiButtonIntent[];
export declare const uiButtonTones: UiButtonTone[];
export declare const uiButtonEmphases: UiButtonEmphasis[];
export interface UiButtonVariant extends UiSizeVariant, UiIntentVariant, UiToneVariant, UiEmphasisVariant {
}
