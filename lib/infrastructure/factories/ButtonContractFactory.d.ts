import { ButtonContract } from '../../domain/contract/entities/ButtonContract';
import { IButtonContractFactory } from '../../domain/contract/services/IButtonContractFactory';
import type { CreateButtonContractRequest } from '../../application/use-cases/CreateButtonContractUseCase';
/**
 * Button Contract Factory
 * Infrastructure Layer - Why It Matters:
 * Infrastructure concerns (persistence, external services, frameworks) are
 * isolated here through interfaces and adapters. This allows the domain and
 * application layers to remain independent and testable.
 */
export declare class ButtonContractFactory implements IButtonContractFactory {
    /**
     * Creates a button contract from a request
     */
    createContract(request: CreateButtonContractRequest): ButtonContract;
    /**
     * Creates a standard button contract with default variants and props
     */
    createStandardButtonContract(name: string): ButtonContract;
}
//# sourceMappingURL=ButtonContractFactory.d.ts.map