// =================================================================
// Agnostic UI Contract Button - Domain-Driven Design Architecture
// =================================================================
// 
// This package provides the button component contract with comprehensive
// business logic, accessibility compliance, and state management using DDD principles.
// 
// Architecture Layer:
// - Domain Layer: Entities, Value Objects, Domain Services
// - Application Layer: Use Cases for orchestration
// - Infrastructure Layer: Validators, Repositories
// =================================================================

// Initialize bootstrap
import './bootstrap'

// =================================================================
// DDD ARCHITECTURE EXPORTS (New)
// =================================================================

// Domain Layer - Why It Matters:
// The domain layer contains the core business logic and rules. Entities represent
// business concepts with identity and behavior, while Value Objects represent
// immutable descriptive aspects. This separation ensures business rules are
// preserved and testable independently of infrastructure concerns.
export { ButtonContract } from './domain/contract/entities/ButtonContract';
export type { ButtonProp, ButtonAccessibility } from './domain/contract/entities/ButtonContract';

export { ButtonVariant } from './domain/contract/value-objects/ButtonVariant';

// Application Layer - Why It Matters:
// Use Cases orchestrate complex business operations and coordinate between
// domain objects. They encapsulate application-specific logic while keeping
// the domain layer pure and focused on business rules.
export { CreateButtonContractUseCase } from './application/use-cases/CreateButtonContractUseCase';
export type {
  CreateButtonContractRequest,
  CreateButtonContractResponse
} from './application/use-cases/CreateButtonContractUseCase';

// Domain Events - Why It Matters:
// Domain Events capture significant business moments and enable loose coupling between
// bounded contexts. They allow other parts of the system to react to important changes
// without tight dependencies, supporting eventual consistency and event-driven architecture.
export type {
  ButtonDomainEvent,
  ButtonContractCreatedEvent,
  ButtonStateChangedEvent,
  ButtonClickedEvent,
  ButtonAccessibilityValidatedEvent
} from './domain/shared/events/ButtonEvents';

// Dependency Injection - Why It Matters:
// Dependency injection enables loose coupling between components, making the system
// more testable and maintainable. The service container manages the lifecycle of
// services and their dependencies.
export {
  getButtonContractService,
  getCreateButtonContractUseCase
} from './bootstrap';

// =================================================================
// LEGACY COMPATIBILITY EXPORTS (Maintained)
// =================================================================

// Re-export from contract-box (which includes contract-core)
export type {
  UiVariantSize,
  UiVariantIntent,
  UiVariantTone,
  UiVariantEmphasis,
  UiA11yRole,
  UiA11yKeyboardAction
} from "@damarkuncoro/agnostic-ui-contract-box"

export {
  uiSizes as uiButtonSizes,
  uiIntents as uiButtonIntents,
  uiTones as uiButtonTones,
  uiEmphases as uiButtonEmphases,
  uiA11yRoles,
  uiA11yKeyboardActions
} from "@damarkuncoro/agnostic-ui-contract-box"

// Button-specific emphasis (DDD-based)
export type UiButtonEmphasis = "low" | "medium" | "high"

// Legacy type aliases for backward compatibility (deprecated)
export type UiButtonSize = import("@damarkuncoro/agnostic-ui-contract-box").UiVariantSize
export type UiButtonIntent = import("@damarkuncoro/agnostic-ui-contract-box").UiVariantIntent
export type UiButtonTone = import("@damarkuncoro/agnostic-ui-contract-box").UiVariantTone

// =================================================================
// MIGRATION HELPERS
// =================================================================

import { ButtonContract } from './domain/contract/entities/ButtonContract';
import { ButtonVariant } from './domain/contract/value-objects/ButtonVariant';
import { getCreateButtonContractUseCase } from './bootstrap';
import type { CreateButtonContractRequest } from './application/use-cases/CreateButtonContractUseCase';

/**
 * Creates a standard button contract using DDD
 */
export function createStandardButtonContract(name: string): ButtonContract {
  return ButtonContract.create({
    name,
    variants: [
      ButtonVariant.createSizeVariant(),
      ButtonVariant.createIntentVariant(),
      ButtonVariant.createToneVariant(),
      ButtonVariant.createEmphasisVariant()
    ],
    props: [
      { name: 'disabled', type: 'boolean', required: false, default: false },
      { name: 'loading', type: 'boolean', required: false, default: false },
      { name: 'icon', type: 'string', required: false },
      { name: 'iconPosition', type: 'string', enum: ['start', 'end'], required: false, default: 'start' }
    ],
    accessibility: {
      role: 'button',
      keyboard: ['Enter', 'Space'],
      focusable: true,
      label: true
    }
  });
}

/**
 * Creates a button contract using the use case
 */
export async function createButtonContract(
  request: CreateButtonContractRequest
): Promise<{ contract: ButtonContract; success: boolean; message: string }> {
  const useCase = getCreateButtonContractUseCase();
  return useCase.execute(request);
}
