// contract-packages/agnostic-ui-contract-button/src/bootstrap.ts

/**
 * Contract-Button Application Bootstrap
 * Sets up dependency injection container for button operations using DDD principles
 */

import { CreateButtonUseCase } from './application/use-cases/CreateButtonUseCase';
import { ButtonAccessibilityValidator } from './infrastructure/validators/ButtonAccessibilityValidator';
import { IButtonValidator } from './domain/button/services/IButtonValidator';

// Service container for dependency injection
class ButtonServiceContainer {
  private static instance: ButtonServiceContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.initializeServices();
  }

  static getInstance(): ButtonServiceContainer {
    if (!ButtonServiceContainer.instance) {
      ButtonServiceContainer.instance = new ButtonServiceContainer();
    }
    return ButtonServiceContainer.instance;
  }

  private initializeServices(): void {
    // Infrastructure - Button Validators
    const accessibilityValidator = new ButtonAccessibilityValidator();
    this.services.set('ButtonAccessibilityValidator', accessibilityValidator);

    // Button Validators Array
    const buttonValidators: IButtonValidator[] = [accessibilityValidator];
    this.services.set('ButtonValidators', buttonValidators);

    // Application Services
    this.services.set('CreateButtonUseCase', new CreateButtonUseCase(buttonValidators));
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service not found: ${serviceName}`);
    }
    return service;
  }

  // Convenience methods for commonly used services
  getCreateButtonUseCase(): CreateButtonUseCase {
    return this.get<CreateButtonUseCase>('CreateButtonUseCase');
  }

  getButtonAccessibilityValidator(): ButtonAccessibilityValidator {
    return this.get<ButtonAccessibilityValidator>('ButtonAccessibilityValidator');
  }

  getButtonValidators(): IButtonValidator[] {
    return this.get<IButtonValidator[]>('ButtonValidators');
  }
}

// Export singleton instance
export const buttonServiceContainer = ButtonServiceContainer.getInstance();

// Export convenience functions
export function getCreateButtonUseCase(): CreateButtonUseCase {
  return buttonServiceContainer.getCreateButtonUseCase();
}

export function getButtonAccessibilityValidator(): ButtonAccessibilityValidator {
  return buttonServiceContainer.getButtonAccessibilityValidator();
}

export function getButtonValidators(): IButtonValidator[] {
  return buttonServiceContainer.getButtonValidators();
}

// Export service locator function for generic access
export function getButtonService<T>(serviceName: string): T {
  return buttonServiceContainer.get<T>(serviceName);
}