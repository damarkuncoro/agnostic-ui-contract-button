// src/resolver.ts

import { UI_BUTTON_DEFAULT_VARIANT } from "./constants"
import type { UiButtonProps } from "./props"

export function resolveButtonProps(
  props: UiButtonProps
): Required<UiButtonProps> {
  return {
    id: props.id ?? "",
    name: props.name ?? "",
    type: props.type ?? "button",
    href: props.href ?? "",
    target: props.target ?? "",
    rel: props.rel ?? "",
    variant: {
      ...UI_BUTTON_DEFAULT_VARIANT,
      ...props.variant,
    },
    state: {
      disabled: false,
      loading: false,
      ...props.state,
    },
    a11y: {
      ...props.a11y,
    },
  }
}
