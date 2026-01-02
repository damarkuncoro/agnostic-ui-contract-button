// src/a11y.ts

import type { UiBoxA11y } from "@damarkuncoro/agnostic-ui-contract-box"

// Button extends box accessibility with button-specific features
export interface UiButtonA11y extends UiBoxA11y {
  // Button role is always "button" for button components
  role?: "button";

  // Button-specific ARIA properties
  ariaPressed?: boolean;  // For toggle buttons
  ariaExpanded?: boolean; // For dropdown/menu buttons
}