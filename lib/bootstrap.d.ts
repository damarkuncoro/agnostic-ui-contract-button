/**
 * Contract-Button Application Bootstrap
 * Sets up dependency injection container for button operations using DDD principles
 *
 * Infrastructure Layer - Why It Matters:
 * Infrastructure concerns (persistence, external services, frameworks) are
 * isolated here through interfaces and adapters. This allows the domain and
 * application layers to remain independent and testable.
 */
import { CreateButtonContractUseCase } from './application/use-cases/CreateButtonContractUseCase';
import { ButtonContractFactory } from './infrastructure/factories/ButtonContractFactory';
import { ButtonContractValidator } from './infrastructure/validators/ButtonContractValidator';
import { VariantFactory } from '@damarkuncoro/agnostic-ui-contract-core';
/**
 * Button Contract Service Container
 * Manages the lifecycle of services and their dependencies
 */
declare class ButtonContractServiceContainer {
    private static instance;
    private services;
    private constructor();
    static getInstance(): ButtonContractServiceContainer;
    private initializeServices;
    get<T>(serviceName: string): T;
    getCreateButtonContractUseCase(): CreateButtonContractUseCase;
    getButtonContractFactory(): ButtonContractFactory;
    getButtonContractValidator(): ButtonContractValidator;
    getButtonContractRepository(): import('./infrastructure/repositories/ButtonContractRepository').InMemoryButtonContractRepository;
    getVariantFactory(): VariantFactory;
}
export declare const buttonContractServiceContainer: ButtonContractServiceContainer;
export declare function getCreateButtonContractUseCase(): CreateButtonContractUseCase;
export declare function getButtonContractFactory(): ButtonContractFactory;
export declare function getButtonContractService<T>(serviceName: string): T;
export declare function getButtonContractValidator(): ButtonContractValidator;
export declare function getButtonContractRepository(): import('./infrastructure/repositories/ButtonContractRepository').InMemoryButtonContractRepository;
export declare function getVariantFactory(): VariantFactory;
export {};
//# sourceMappingURL=bootstrap.d.ts.map