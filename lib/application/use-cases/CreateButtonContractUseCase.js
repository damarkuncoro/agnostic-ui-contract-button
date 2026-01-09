"use strict";
// contract-packages/agnostic-ui-contract-button/src/application/use-cases/CreateButtonContractUseCase.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateButtonContractUseCase = void 0;
/**
 * Create Button Contract Use Case
 * Orchestrates the creation of new button contract instances with validation
 *
 * Application Layer - Why It Matters:
 * Use Cases orchestrate complex business operations and coordinate between
 * domain objects. They encapsulate application-specific logic while keeping
 * the domain layer pure and focused on business rules.
 */
class CreateButtonContractUseCase {
    constructor(contractFactory) {
        this.contractFactory = contractFactory;
    }
    /**
     * Executes the create button contract use case
     */
    async execute(request) {
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
        }
        catch (error) {
            return {
                contract: null,
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
    validateInput(request) {
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
    createStandardButtonContract(name) {
        return this.contractFactory.createStandardButtonContract(name);
    }
}
exports.CreateButtonContractUseCase = CreateButtonContractUseCase;
