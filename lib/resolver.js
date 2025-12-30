"use strict";
// src/resolver.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveButtonProps = resolveButtonProps;
const constants_1 = require("./constants");
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
//# sourceMappingURL=resolver.js.map