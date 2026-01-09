import { ButtonContract } from '../entities/ButtonContract';
/**
 * Button Contract Repository Interface
 *
 * Infrastructure Layer - Why It Matters:
 * Infrastructure concerns (persistence, external services, frameworks) are
 * isolated here through interfaces and adapters. This allows the domain and
 * application layers to remain independent and testable.
 */
export interface IButtonContractRepository {
    /**
     * Saves a button contract
     */
    save(contract: ButtonContract): Promise<void>;
    /**
     * Finds a button contract by ID
     */
    findById(id: string): Promise<ButtonContract | null>;
    /**
     * Finds a button contract by name
     */
    findByName(name: string): Promise<ButtonContract | null>;
    /**
     * Gets all button contracts
     */
    findAll(): Promise<ButtonContract[]>;
    /**
     * Deletes a button contract
     */
    delete(id: string): Promise<void>;
    /**
     * Checks if a contract exists
     */
    exists(id: string): Promise<boolean>;
    /**
     * Gets contracts by variant type
     */
    findByVariantType(variantType: string): Promise<ButtonContract[]>;
}
//# sourceMappingURL=IButtonContractRepository.d.ts.map