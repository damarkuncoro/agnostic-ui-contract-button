// src/variant.ts - Button extends Box with button-specific variants

import type {
  UiBoxVariant,
  UiBoxStateVariant,
  UiBoxLayoutVariant,
  UiBoxTone
} from "@damarkuncoro/agnostic-ui-contract-box"

// Button extends Box - inherits all box properties
export interface UiButtonVariant extends UiBoxVariant, UiBoxStateVariant, UiBoxLayoutVariant {
  // Button-specific emphasis (extends box capabilities)
  emphasis?: "low" | "medium" | "high";
}

// Button type variants (HTML button types)
export type UiButtonType = "button" | "submit" | "reset";
export const uiButtonTypes: UiButtonType[] = ["button", "submit", "reset"];

// Icon semantic variants (button can have icon)
export interface UiButtonIconVariant {
  hasIcon?: boolean;        // Whether button has an icon
  iconPosition?: "start" | "end";  // Icon position relative to text
}

// Complete button variant interface
export interface UiButtonVariantExtended extends UiButtonVariant, UiButtonIconVariant {
  type?: UiButtonType;
  tone?: UiBoxTone;  // Button can use box tones
}
