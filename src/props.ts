// src/props.ts

import type { UiButtonVariant } from "./variant"
import type { UiButtonState } from "./state"
import type { UiButtonA11y } from "./a11y"

export interface UiButtonProps {
  id?: string
  name?: string

  type?: "button" | "submit" | "reset"

  href?: string
  target?: string
  rel?: string

  variant?: UiButtonVariant
  state?: UiButtonState
  a11y?: UiButtonA11y
}
