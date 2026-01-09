import { ButtonContract } from '../../domain/contract/entities/ButtonContract';
import { IButtonContractRepository } from '../../domain/contract/services/IButtonContractRepository';
/**
 * In-Memory Button Contract Repository
 * Infrastructure Layer - Why It Matters:
 * Infrastructure concerns (persistence, external services, frameworks) are
 * isolated here through interfaces and adapters. This allows the domain and
 * application layers to remain independent and testable.
 */
export declare class InMemoryButtonContractRepository implements IButtonContractRepository {
    private contracts;
    private contractsByName;
    save(contract: ButtonContract): Promise<void>;
    findById(id: string): Promise<ButtonContract | null>;
    findByName(name: string): Promise<ButtonContract | null>;
    findAll(): Promise<ButtonContract[]>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
    findByVariantType(variantType: string): Promise<ButtonContract[]>;
    clear(): void;
    getCount(): number;
    getContractsWithAccessibility(): Promise<ButtonContract[]>;
}
/**
 * Button Contract Repository Factory
 * Creates repository instances with different storage strategies
 */
export declare class ButtonContractRepositoryFactory {
    private static inMemoryInstance;
    static createInMemory(): IButtonContractRepository;
}
//# sourceMappingURL=ButtonContractRepository.d.ts.map