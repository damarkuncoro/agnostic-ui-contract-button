// Re-export from contract-box (which includes contract-core)
export type {
  UiVariantSize,
  UiVariantIntent,
  UiVariantTone,
  UiVariantEmphasis,
  UiA11yRole,
  UiA11yKeyboardAction
} from "@damarkuncoro/agnostic-ui-contract-box"

export {
  uiSizes as uiButtonSizes,
  uiIntents as uiButtonIntents,
  uiTones as uiButtonTones,
  uiEmphases as uiButtonEmphases,
  uiA11yRoles,
  uiA11yKeyboardActions
} from "@damarkuncoro/agnostic-ui-contract-box"

// Re-export button-specific types and arrays
export type {
  UiButtonVariant,
  UiButtonVariantExtended,
  UiButtonType,
  UiButtonIconVariant
} from "./variant"

// Re-export button size/intent/tone types from box
export type {
  UiVariantSize as UiButtonSize,
  UiVariantIntent as UiButtonIntent,
  UiVariantTone as UiButtonTone
} from "@damarkuncoro/agnostic-ui-contract-box"

// Button-specific emphasis
export type UiButtonEmphasis = "low" | "medium" | "high"

export {
  uiButtonTypes
} from "./variant"

// Re-export button-specific contracts
export type { UiButtonProps } from "./props"
export type { UiButtonState } from "./state"
export type { UiButtonA11y } from "./a11y"
