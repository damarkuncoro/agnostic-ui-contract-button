import type { UiButtonProps } from "./props";
import type { UiTheme } from "@damarkuncoro/agnostic-ui-contract-core";
export declare function resolveButtonProps(props: UiButtonProps): Required<UiButtonProps>;
/**
 * Example: Resolve button theme with responsive tokens
 * Shows how contract-button would use the resolver system
 */
export declare function resolveButtonTheme(baseTheme: UiTheme, options?: {
    mode?: "static" | "runtime";
    breakpoint?: string;
}): UiTheme;
/**
 * Example: Get resolved button styles for current breakpoint
 * Shows runtime usage in component implementation
 */
export declare function getResolvedButtonStyles(theme: UiTheme, variant: string, breakpoint?: string): {
    height: any;
    paddingX: any;
    paddingY: any;
    fontSize: any;
    borderRadius: any;
    gap: any;
};
//# sourceMappingURL=resolver.d.ts.map