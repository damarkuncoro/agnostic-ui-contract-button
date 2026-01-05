// src/resolver.ts

import { UI_BUTTON_DEFAULT_VARIANT } from "./constants"
import type { UiButtonProps } from "./props"
import { resolveTheme } from "@damarkuncoro/agnostic-ui-contract-core"
import type { UiTheme } from "@damarkuncoro/agnostic-ui-contract-core"

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

/**
 * Example: Resolve button theme with responsive tokens
 * Shows how contract-button would use the resolver system
 */
export function resolveButtonTheme(
  baseTheme: UiTheme,
  options: {
    mode?: "static" | "runtime"
    breakpoint?: string
  } = {}
): UiTheme {
  // Example theme with resolver markers in extended tokens
  const buttonTheme = {
    ...baseTheme,
    extendedTokens: {
      ...((baseTheme as any).extendedTokens || {}),
      // Button-specific tokens using resolver markers
      button: {
        height: { $responsive: { sm: 32, md: 40, lg: 48 } },
        padding: {
          x: { $math: "spacing.sm * 1.5" },
          y: { $math: "spacing.xs * 2" }
        },
        fontSize: { $ref: "typography.body.fontSize" },
        borderRadius: { $ref: "radius.md" },
        // Responsive spacing
        gap: { $responsive: { sm: 4, md: 6, lg: 8 } }
      }
    }
  } as UiTheme

  // Resolve the theme using the resolver pipeline
  return resolveTheme(buttonTheme, options)
}

/**
 * Example: Get resolved button styles for current breakpoint
 * Shows runtime usage in component implementation
 */
export function getResolvedButtonStyles(
  theme: UiTheme,
  variant: string,
  breakpoint?: string
) {
  const resolvedTheme = resolveTheme(theme, {
    mode: "runtime",
    breakpoint
  })

  // Extract resolved button tokens from extended tokens
  const buttonTokens = (resolvedTheme as any).extendedTokens?.button

  return {
    height: buttonTokens?.height,
    paddingX: buttonTokens?.padding?.x,
    paddingY: buttonTokens?.padding?.y,
    fontSize: buttonTokens?.fontSize,
    borderRadius: buttonTokens?.borderRadius,
    gap: buttonTokens?.gap
  }
}
