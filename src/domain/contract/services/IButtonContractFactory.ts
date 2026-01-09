// contract-packages/agnostic-ui-contract-button/src/domain/contract/services/IButtonContractFactory.ts

import { ButtonContract } from '../entities/ButtonContract';
import { ButtonVariant } from '../value-objects/ButtonVariant';
import type { CreateButtonContractRequest } from '../../../application/use-cases/CreateButtonContractUseCase';

/**
 * Button Contract Factory Interface
 * 
 * Domain Services - Why It Matters:
 * Domain Services contain business logic that doesn't naturally belong to
 * entities or value objects. They orchestrate complex operations across
 * multiple domain objects while keeping business rules centralized.
 */
export interface IButtonContractFactory {
  /**
   * Creates a button contract from a request
   */
  createContract(request: CreateButtonContractRequest): ButtonContract;

  /**
   * Creates a standard button contract with default variants and props
   */
  createStandardButtonContract(name: string): ButtonContract;
}
