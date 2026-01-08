// contract-packages/agnostic-ui-contract-button/src/application/use-cases/CreateButtonContractUseCase.ts

import { ButtonContract } from '../../domain/contract/entities/ButtonContract';
import { ButtonVariant } from '../../domain/contract/value-objects/ButtonVariant';
import { IButtonContractFactory } from '../../domain/contract/services/IButtonContractFactory';

/**
 * Create Button Contract Use Case
 * Orchestrates the creation of new button contract instances with validation
 * 
 * Application Layer - Why It Matters:
 * Use Cases orchestrate complex business operations and coordinate between
 * domain objects. They encapsulate application-specific logic while keeping
 * the domain layer pure and focused on business rules.
 */
export class CreateButtonContractUseCase {
  constructor(
    private readonly contractFactory: IButtonContractFactory
  ) {}

  /**
   * Executes the create button contract use case
   */
  async execute(request: CreateButtonContractRequest): Promise<CreateButtonContractResponse> {
    try {
      // Validate input
      this.validateInput(request);

      // Create button contract using factory
      const contract = this.contractFactory.createContract(request);

      // Validate accessibility
      const accessibilityResult = contract.validateAccessibility();

      // Get domain events
      const domainEvents = contract.getDomainEvents();

      return {
        contract,
        success: true,
        message: `Button contract '${request.name}' created successfully`,
        accessibility: accessibilityResult,
        domainEvents
      };
    } catch (error) {
      return {
        contract: null as any,
        success: false,
        message: `Failed to create button contract: ${error instanceof Error ? error.message : 'Unknown error'}`,
        accessibility: { isAccessible: false, violations: [] },
        domainEvents: []
      };
    }
  }

  /**
   * Validates the input data
   */
  private validateInput(request: CreateButtonContractRequest): void {
    if (!request.name || typeof request.name !== 'string') {
      throw new Error('Contract name is required and must be a string');
    }

    // Validate name format (lowercase, alphanumeric, dashes)
    const validName = /^[a-z][a-z0-9-]*$/;
    if (!validName.test(request.name)) {
      throw new Error('Contract name must be lowercase with only alphanumeric characters and dashes');
    }

    // Validate variants if provided
    if (request.variants) {
      request.variants.forEach((variant, index) => {
        if (!variant.type || !variant.values) {
          throw new Error(`Variant at index ${index} must have type and values`);
        }
      });
    }
  }

  /**
   * Creates a standard button contract
   */
  createStandardButtonContract(name: string): ButtonContract {
    return this.contractFactory.createStandardButtonContract(name);
  }
}

/**
 * Input for CreateButtonContractUseCase
 */
export interface CreateButtonContractRequest {
  name: string;
  variants?: Array<{ type: string; values: string[] }>;
  props?: Array<{
    name: string;
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    required?: boolean;
    default?: any;
    enum?: string[];
    description?: string;
  }>;
  accessibility?: {
    role: string;
    keyboard: string[];
    focusable: boolean;
    label?: boolean;
  };
}

/**
 * Output for CreateButtonContractUseCase
 */
export interface CreateButtonContractResponse {
  contract: ButtonContract | null;
  success: boolean;
  message: string;
  accessibility: { isAccessible: boolean; violations: string[] };
  domainEvents: any[];
}
