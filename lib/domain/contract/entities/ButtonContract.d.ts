import { BaseEntity } from '@damarkuncoro/agnostic-ui-contract-core';
import { ContractName } from '@damarkuncoro/agnostic-ui-contract-core';
import { ButtonVariant } from '../value-objects/ButtonVariant';
/**
 * Button Contract Entity
 * Represents a button component contract with its variants and properties
 * following DDD patterns with proper business logic encapsulation
 */
export declare class ButtonContract extends BaseEntity {
    private readonly _name;
    private readonly _variants;
    private readonly _props;
    private readonly _accessibility;
    constructor(id: string, _name: ContractName, _variants: ButtonVariant[], _props: ButtonProp[], _accessibility: ButtonAccessibility);
    /**
     * Creates a new ButtonContract instance
     */
    static create(params: {
        id?: string;
        name: string;
        variants?: ButtonVariant[];
        props?: ButtonProp[];
        accessibility?: ButtonAccessibility;
    }): ButtonContract;
    /**
     * Adds a variant to the contract
     */
    addVariant(variant: ButtonVariant): void;
    /**
     * Gets a variant by type
     */
    getVariantByType(type: string): ButtonVariant | undefined;
    /**
     * Validates accessibility compliance
     */
    validateAccessibility(): {
        isAccessible: boolean;
        violations: string[];
    };
    /**
     * Validates business rules
     */
    private validateBusinessRules;
    get name(): ContractName;
    get variants(): readonly ButtonVariant[];
    get props(): readonly ButtonProp[];
    get accessibility(): ButtonAccessibility;
}
/**
 * Button Property Schema
 */
export interface ButtonProp {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    required?: boolean;
    default?: any;
    enum?: string[];
    description?: string;
}
/**
 * Button Accessibility Rules
 */
export interface ButtonAccessibility {
    role: string;
    keyboard: string[];
    focusable: boolean;
    label?: boolean;
}
//# sourceMappingURL=ButtonContract.d.ts.map