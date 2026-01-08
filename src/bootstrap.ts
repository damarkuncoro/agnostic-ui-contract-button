// contract-packages/agnostic-ui-contract-button/src/bootstrap.ts

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
import type { IButtonContractFactory } from './domain/contract/services/IButtonContractFactory';

/**
 * Button Contract Service Container
 * Manages the lifecycle of services and their dependencies
 */
class ButtonContractServiceContainer {
  private static instance: ButtonContractServiceContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.initializeServices();
  }

  static getInstance(): ButtonContractServiceContainer {
    if (!ButtonContractServiceContainer.instance) {
      ButtonContractServiceContainer.instance = new ButtonContractServiceContainer();
    }
    return ButtonContractServiceContainer.instance;
  }

  private initializeServices(): void {
    // Infrastructure - Factories
    const factory: IButtonContractFactory = new ButtonContractFactory();
    this.services.set('IButtonContractFactory', factory);
    this.services.set('ButtonContractFactory', factory);

    // Application - Use Cases
    const createUseCase = new CreateButtonContractUseCase(factory);
    this.services.set('CreateButtonContractUseCase', createUseCase);
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service not found: ${serviceName}`);
    }
    return service;
  }

  // Convenience methods for commonly used services
  getCreateButtonContractUseCase(): CreateButtonContractUseCase {
    return this.get<CreateButtonContractUseCase>('CreateButtonContractUseCase');
  }

  getButtonContractFactory(): ButtonContractFactory {
    return this.get<ButtonContractFactory>('ButtonContractFactory');
  }
}

// Export singleton instance
export const buttonContractServiceContainer = ButtonContractServiceContainer.getInstance();

// Export convenience functions
export function getCreateButtonContractUseCase(): CreateButtonContractUseCase {
  return buttonContractServiceContainer.getCreateButtonContractUseCase();
}

export function getButtonContractFactory(): ButtonContractFactory {
  return buttonContractServiceContainer.getButtonContractFactory();
}

// Export service locator function for generic access
export function getButtonContractService<T>(serviceName: string): T {
  return buttonContractServiceContainer.get<T>(serviceName);
}
