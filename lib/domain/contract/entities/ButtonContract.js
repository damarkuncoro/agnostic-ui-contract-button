"use strict";
// contract-packages/agnostic-ui-contract-button/src/domain/contract/entities/ButtonContract.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonContract = void 0;
const agnostic_ui_contract_core_1 = require("@damarkuncoro/agnostic-ui-contract-core");
const agnostic_ui_contract_core_2 = require("@damarkuncoro/agnostic-ui-contract-core");
const ButtonEvents_1 = require("../../shared/events/ButtonEvents");
/**
 * Button Contract Entity
 * Represents a button component contract with its variants and properties
 * following DDD patterns with proper business logic encapsulation
 */
class ButtonContract extends agnostic_ui_contract_core_1.BaseEntity {
    constructor(id, _name, _variants, _props, _accessibility) {
        super(id);
        this._name = _name;
        this._variants = _variants;
        this._props = _props;
        this._accessibility = _accessibility;
        this.validateBusinessRules();
    }
    /**
     * Creates a new ButtonContract instance
     */
    static create(params) {
        const contractId = params.id || crypto.randomUUID();
        const contractName = agnostic_ui_contract_core_2.ContractName.create(params.name);
        const contract = new ButtonContract(contractId, contractName, params.variants || [], params.props || [], params.accessibility || { role: 'button', keyboard: ['Enter', 'Space'], focusable: true });
        // Emit creation event
        contract.addDomainEvent(new ButtonEvents_1.ButtonContractCreatedEvent(contractId, params.name));
        return contract;
    }
    /**
     * Adds a variant to the contract
     */
    addVariant(variant) {
        if (this._variants.some(v => v.equals(variant))) {
            throw new Error('Variant already exists in this contract');
        }
        this._variants.push(variant);
        this.markAsModified();
    }
    /**
     * Gets a variant by type
     */
    getVariantByType(type) {
        return this._variants.find(v => v.type === type);
    }
    /**
     * Validates accessibility compliance
     */
    validateAccessibility() {
        const violations = [];
        if (!this._accessibility.role) {
            violations.push('Button must have an ARIA role');
        }
        if (this._accessibility.keyboard.length === 0) {
            violations.push('Button must have keyboard support');
        }
        const isAccessible = violations.length === 0;
        // Emit validation event
        this.addDomainEvent(new ButtonEvents_1.ButtonAccessibilityValidatedEvent(this.id, isAccessible, violations));
        return { isAccessible, violations };
    }
    /**
     * Validates business rules
     */
    validateBusinessRules() {
        if (!this._name) {
            throw new Error('Button contract must have a name');
        }
        // Business rule: Button contracts should have at least size and intent variants
        const hasSizeVariant = this._variants.some(v => v.type === 'size');
        const hasIntentVariant = this._variants.some(v => v.type === 'intent');
        if (this._variants.length > 0 && (!hasSizeVariant || !hasIntentVariant)) {
            // This is a warning, not an error - some buttons may not need both
        }
    }
    // Getters
    get name() {
        return this._name;
    }
    get variants() {
        return [...this._variants];
    }
    get props() {
        return [...this._props];
    }
    get accessibility() {
        return { ...this._accessibility };
    }
}
exports.ButtonContract = ButtonContract;
