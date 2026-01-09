// contract-packages/agnostic-ui-contract-button/src/infrastructure/repositories/ButtonContractRepository.ts

import { ButtonContract } from '../../domain/contract/entities/ButtonContract';
import { IButtonContractRepository } from '../../domain/contract/services/IButtonContractRepository';

/**
 * In-Memory Button Contract Repository
 * Infrastructure Layer - Why It Matters:
 * Infrastructure concerns (persistence, external services, frameworks) are
 * isolated here through interfaces and adapters. This allows the domain and
 * application layers to remain independent and testable.
 */
export class InMemoryButtonContractRepository implements IButtonContractRepository {
  private contracts = new Map<string, ButtonContract>();
  private contractsByName = new Map<string, ButtonContract>();

  async save(contract: ButtonContract): Promise<void> {
    this.contracts.set(contract.id, contract);
    this.contractsByName.set(contract.name.value, contract);
  }

  async findById(id: string): Promise<ButtonContract | null> {
    return this.contracts.get(id) || null;
  }

  async findByName(name: string): Promise<ButtonContract | null> {
    return this.contractsByName.get(name) || null;
  }

  async findAll(): Promise<ButtonContract[]> {
    return Array.from(this.contracts.values());
  }

  async delete(id: string): Promise<void> {
    const contract = this.contracts.get(id);
    if (contract) {
      this.contracts.delete(id);
      this.contractsByName.delete(contract.name.value);
    }
  }

  async exists(id: string): Promise<boolean> {
    return this.contracts.has(id);
  }

  async findByVariantType(variantType: string): Promise<ButtonContract[]> {
    return Array.from(this.contracts.values()).filter(contract =>
      contract.variants.some(variant => variant.type === variantType)
    );
  }

  // Utility methods for testing and management
  clear(): void {
    this.contracts.clear();
    this.contractsByName.clear();
  }

  getCount(): number {
    return this.contracts.size;
  }

  getContractsWithAccessibility(): Promise<ButtonContract[]> {
    return Promise.resolve(
      Array.from(this.contracts.values()).filter(contract =>
        contract.accessibility.role === 'button' &&
        contract.accessibility.keyboard.length > 0
      )
    );
  }
}

/**
 * Button Contract Repository Factory
 * Creates repository instances with different storage strategies
 */
export class ButtonContractRepositoryFactory {
  private static inMemoryInstance: InMemoryButtonContractRepository | null = null;

  static createInMemory(): IButtonContractRepository {
    if (!this.inMemoryInstance) {
      this.inMemoryInstance = new InMemoryButtonContractRepository();
    }
    return this.inMemoryInstance;
  }

  // Could add other implementations:
  // static createFileSystem(basePath: string): IButtonContractRepository
  // static createDatabase(connectionString: string): IButtonContractRepository
}