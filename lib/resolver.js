"use strict";
// src/resolver.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveButtonProps = resolveButtonProps;
exports.resolveButtonTheme = resolveButtonTheme;
exports.getResolvedButtonStyles = getResolvedButtonStyles;
const constants_1 = require("./constants");
const agnostic_ui_contract_core_1 = require("@damarkuncoro/agnostic-ui-contract-core");
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
 */
function resolveButtonTheme(baseTheme, options = {}) {
    // Example theme with resolver markers in extended tokens
    const buttonTheme = {
        ...baseTheme,
        extendedTokens: {
            ...(baseTheme.extendedTokens || {}),
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
    };
    // Resolve the theme using the resolver pipeline
    return (0, agnostic_ui_contract_core_1.resolveTheme)(buttonTheme, options);
}
/**
 * Example: Get resolved button styles for current breakpoint
 * Shows runtime usage in component implementation
 */
function getResolvedButtonStyles(theme, variant, breakpoint) {
    const resolvedTheme = (0, agnostic_ui_contract_core_1.resolveTheme)(theme, {
        mode: "runtime",
        breakpoint
    });
    // Extract resolved button tokens from extended tokens
    const buttonTokens = resolvedTheme.extendedTokens?.button;
    return {
        height: buttonTokens?.height,
        paddingX: buttonTokens?.padding?.x,
        paddingY: buttonTokens?.padding?.y,
        fontSize: buttonTokens?.fontSize,
        borderRadius: buttonTokens?.borderRadius,
        gap: buttonTokens?.gap
    };
}
//# sourceMappingURL=resolver.js.map