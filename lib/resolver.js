"use strict";
// src/resolver.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveButtonProps = resolveButtonProps;
const constants_1 = require("./constants");
// Note: Theme resolution functions are commented out as they depend on
// legacy contract-core types that have been refactored to DDD architecture
// import { resolveTheme } from "@damarkuncoro/agnostic-ui-contract-core"
// import type { UiTheme } from "@damarkuncoro/agnostic-ui-contract-core"
function resolveButtonProps(props) {
    return {
        id: props.id ?? "",
        name: props.name ?? "",
        type: props.type ?? "button",
        href: props.href ?? "",
        target: props.target ?? "",
        rel: props.rel ?? "",
        variant: {
            ...constants_1.UI_BUTTON_DEFAULT_VARIANT,
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
    };
}
/**
 * Example: Resolve button theme with responsive tokens
 * Shows how contract-button would use the resolver system
 * NOTE: Commented out due to DDD refactoring - theme resolution moved to domain layer
 */
/*
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
*/
/**
 * Example: Get resolved button styles for current breakpoint
 * Shows runtime usage in component implementation
 * NOTE: Commented out due to DDD refactoring - style resolution moved to domain layer
 */
/*
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
*/
//# sourceMappingURL=resolver.js.map