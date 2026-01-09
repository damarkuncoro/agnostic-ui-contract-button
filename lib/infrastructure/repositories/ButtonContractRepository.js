"use strict";
// contract-packages/agnostic-ui-contract-button/src/infrastructure/repositories/ButtonContractRepository.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonContractRepositoryFactory = exports.InMemoryButtonContractRepository = void 0;
/**
 * In-Memory Button Contract Repository
 * Infrastructure Layer - Why It Matters:
 * Infrastructure concerns (persistence, external services, frameworks) are
 * isolated here through interfaces and adapters. This allows the domain and
 * application layers to remain independent and testable.
 */
class InMemoryButtonContractRepository {
    constructor() {
        this.contracts = new Map();
        this.contractsByName = new Map();
    }
    async save(contract) {
        this.contracts.set(contract.id, contract);
        this.contractsByName.set(contract.name.value, contract);
    }
    async findById(id) {
        return this.contracts.get(id) || null;
    }
    async findByName(name) {
        return this.contractsByName.get(name) || null;
    }
    async findAll() {
        return Array.from(this.contracts.values());
    }
    async delete(id) {
        const contract = this.contracts.get(id);
        if (contract) {
            this.contracts.delete(id);
            this.contractsByName.delete(contract.name.value);
        }
    }
    async exists(id) {
        return this.contracts.has(id);
    }
    async findByVariantType(variantType) {
        return Array.from(this.contracts.values()).filter(contract => contract.variants.some(variant => variant.type === variantType));
    }
    // Utility methods for testing and management
    clear() {
        this.contracts.clear();
        this.contractsByName.clear();
    }
    getCount() {
        return this.contracts.size;
    }
    getContractsWithAccessibility() {
        return Promise.resolve(Array.from(this.contracts.values()).filter(contract => contract.accessibility.role === 'button' &&
            contract.accessibility.keyboard.length > 0));
    }
}
exports.InMemoryButtonContractRepository = InMemoryButtonContractRepository;
/**
 * Button Contract Repository Factory
 * Creates repository instances with different storage strategies
 */
class ButtonContractRepositoryFactory {
    static createInMemory() {
        if (!this.inMemoryInstance) {
            this.inMemoryInstance = new InMemoryButtonContractRepository();
        }
        return this.inMemoryInstance;
    }
}
exports.ButtonContractRepositoryFactory = ButtonContractRepositoryFactory;
ButtonContractRepositoryFactory.inMemoryInstance = null;
