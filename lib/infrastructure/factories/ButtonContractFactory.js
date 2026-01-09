"use strict";
// contract-packages/agnostic-ui-contract-button/src/infrastructure/factories/ButtonContractFactory.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonContractFactory = void 0;
const ButtonContract_1 = require("../../domain/contract/entities/ButtonContract");
const ButtonVariant_1 = require("../../domain/contract/value-objects/ButtonVariant");
/**
 * Button Contract Factory
 * Infrastructure Layer - Why It Matters:
 * Infrastructure concerns (persistence, external services, frameworks) are
 * isolated here through interfaces and adapters. This allows the domain and
 * application layers to remain independent and testable.
 */
class ButtonContractFactory {
    /**
     * Creates a button contract from a request
     */
    createContract(request) {
        const variants = (request.variants || []).map((v) => ButtonVariant_1.ButtonVariant.create(v.type, v.values));
        const props = (request.props || []).map((p) => ({
            name: p.name,
            type: p.type,
            required: p.required || false,
            default: p.default,
            enum: p.enum,
            description: p.description
        }));
        return ButtonContract_1.ButtonContract.create({
            name: request.name,
            variants,
            props,
            accessibility: request.accessibility
        });
    }
    /**
     * Creates a standard button contract with default variants and props
     */
    createStandardButtonContract(name) {
        return this.createContract({
            name,
            variants: [
                { type: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] },
                { type: 'intent', values: ['primary', 'secondary', 'success', 'warning', 'error', 'info'] },
                { type: 'tone', values: ['subtle', 'normal', 'strong'] },
                { type: 'emphasis', values: ['low', 'medium', 'high'] }
            ],
            props: [
                { name: 'disabled', type: 'boolean', required: false, default: false },
                { name: 'loading', type: 'boolean', required: false, default: false },
                { name: 'icon', type: 'string', required: false },
                { name: 'iconPosition', type: 'string', enum: ['start', 'end'], required: false, default: 'start' },
                { name: 'label', type: 'string', required: true, description: 'Button label text' }
            ],
            accessibility: {
                role: 'button',
                keyboard: ['Enter', 'Space'],
                focusable: true,
                label: true
            }
        });
    }
}
exports.ButtonContractFactory = ButtonContractFactory;
