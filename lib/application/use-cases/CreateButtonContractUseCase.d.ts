import { ButtonContract } from '../../domain/contract/entities/ButtonContract';
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
export declare class CreateButtonContractUseCase {
    private readonly contractFactory;
    constructor(contractFactory: IButtonContractFactory);
    /**
     * Executes the create button contract use case
     */
    execute(request: CreateButtonContractRequest): Promise<CreateButtonContractResponse>;
    /**
     * Validates the input data
     */
    private validateInput;
    /**
     * Creates a standard button contract
     */
    createStandardButtonContract(name: string): ButtonContract;
}
/**
 * Input for CreateButtonContractUseCase
 */
export interface CreateButtonContractRequest {
    name: string;
    variants?: Array<{
        type: string;
        values: string[];
    }>;
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
    accessibility: {
        isAccessible: boolean;
        violations: string[];
    };
    domainEvents: any[];
}
//# sourceMappingURL=CreateButtonContractUseCase.d.ts.map