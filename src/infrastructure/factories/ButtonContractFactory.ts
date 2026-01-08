// contract-packages/agnostic-ui-contract-button/src/infrastructure/factories/ButtonContractFactory.ts

import { ButtonContract } from '../../domain/contract/entities/ButtonContract';
import { ButtonVariant } from '../../domain/contract/value-objects/ButtonVariant';
import { IButtonContractFactory } from '../../domain/contract/services/IButtonContractFactory';
import type { CreateButtonContractRequest } from '../../application/use-cases/CreateButtonContractUseCase';

/**
 * Button Contract Factory
 * Infrastructure Layer - Why It Matters:
 * Infrastructure concerns (persistence, external services, frameworks) are
 * isolated here through interfaces and adapters. This allows the domain and
 * application layers to remain independent and testable.
 */
export class ButtonContractFactory implements IButtonContractFactory {
  /**
   * Creates a button contract from a request
   */
  createContract(request: CreateButtonContractRequest): ButtonContract {
    const variants = (request.variants || []).map((v: { type: string; values: string[] }) => 
      ButtonVariant.create(v.type, v.values)
    );

    const props = (request.props || []).map((p: { name: string; type: string; required?: boolean; default?: any; enum?: string[]; description?: string }) => ({
      name: p.name,
      type: p.type,
      required: p.required || false,
      default: p.default,
      enum: p.enum,
      description: p.description
    }));

    return ButtonContract.create({
      name: request.name,
      variants,
      props,
      accessibility: request.accessibility
    });
  }

  /**
   * Creates a standard button contract with default variants and props
   */
  createStandardButtonContract(name: string): ButtonContract {
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
