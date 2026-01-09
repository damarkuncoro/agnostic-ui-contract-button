// contract-packages/agnostic-ui-contract-button/src/domain/contract/entities/ButtonContract.ts

import { BaseEntity } from '@damarkuncoro/agnostic-ui-contract-core';
import { ContractName } from '@damarkuncoro/agnostic-ui-contract-core';
import { ButtonVariant } from '../value-objects/ButtonVariant';
import { 
  ButtonContractCreatedEvent, 
  ButtonStateChangedEvent,
  ButtonAccessibilityValidatedEvent
} from '../../shared/events/ButtonEvents';

/**
 * Button Contract Entity
 * Represents a button component contract with its variants and properties
 * following DDD patterns with proper business logic encapsulation
 */
export class ButtonContract extends BaseEntity {
  constructor(
    id: string,
    private readonly _name: ContractName,
    private readonly _variants: ButtonVariant[],
    private readonly _props: ButtonProp[],
    private readonly _accessibility: ButtonAccessibility
  ) {
    super(id);
    this.validateBusinessRules();
  }

  /**
   * Creates a new ButtonContract instance
   */
  static create(params: {
    id?: string;
    name: string;
    variants?: ButtonVariant[];
    props?: ButtonProp[];
    accessibility?: ButtonAccessibility;
  }): ButtonContract {
    const contractId = params.id || crypto.randomUUID();
    const contractName = ContractName.create(params.name);

    const contract = new ButtonContract(
      contractId,
      contractName,
      params.variants || [],
      params.props || [],
      params.accessibility || { role: 'button', keyboard: ['Enter', 'Space'], focusable: true }
    );

    // Emit creation event
    contract.addDomainEvent(new ButtonContractCreatedEvent(
      contractId,
      params.name
    ));

    return contract;
  }

  /**
   * Adds a variant to the contract
   */
  addVariant(variant: ButtonVariant): void {
    if (this._variants.some(v => v.equals(variant))) {
      throw new Error('Variant already exists in this contract');
    }
    this._variants.push(variant);
    this.markAsModified();
  }

  /**
   * Gets a variant by type
   */
  getVariantByType(type: string): ButtonVariant | undefined {
    return this._variants.find(v => v.type === type);
  }

  /**
   * Validates accessibility compliance
   */
  validateAccessibility(): { isAccessible: boolean; violations: string[] } {
    const violations: string[] = [];

    if (!this._accessibility.role) {
      violations.push('Button must have an ARIA role');
    }

    if (this._accessibility.keyboard.length === 0) {
      violations.push('Button must have keyboard support');
    }

    const isAccessible = violations.length === 0;

    // Emit validation event
    this.addDomainEvent(new ButtonAccessibilityValidatedEvent(
      this.id,
      isAccessible,
      violations
    ));

    return { isAccessible, violations };
  }

  /**
   * Validates business rules
   */
  private validateBusinessRules(): void {
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
  get name(): ContractName {
    return this._name;
  }

  get variants(): readonly ButtonVariant[] {
    return [...this._variants];
  }

  get props(): readonly ButtonProp[] {
    return [...this._props];
  }

  get accessibility(): ButtonAccessibility {
    return { ...this._accessibility };
  }
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
