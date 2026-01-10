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
  getCreateButtonContractUseCase,
  getButtonContractValidator,
  getButtonContractRepository,
  getVariantFactory
} from './bootstrap';

// =================================================================
// LEGACY COMPATIBILITY EXPORTS (Maintained)
// =================================================================

// Define basic UI variant types directly (since contract-core doesn't exist)
export type UiVariantSize = "xs" | "sm" | "md" | "lg" | "xl"
export type UiVariantIntent = "primary" | "secondary" | "success" | "danger" | "warning" | "info"
export type UiVariantTone = "solid" | "outline" | "ghost" | "soft"
export type UiVariantEmphasis = "low" | "medium" | "high"
export type UiA11yRole = "button" | "link" | "tab" | "menuitem"
export type UiA11yKeyboardAction = "Enter" | "Space" | "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight" | "Escape" | "Tab"

// Define basic UI constants
export const uiSizes: readonly UiVariantSize[] = ["xs", "sm", "md", "lg", "xl"] as const
export const uiIntents: readonly UiVariantIntent[] = ["primary", "secondary", "success", "danger", "warning", "info"] as const
export const uiTones: readonly UiVariantTone[] = ["solid", "outline", "ghost", "soft"] as const
export const uiEmphases: readonly UiVariantEmphasis[] = ["low", "medium", "high"] as const
export const uiA11yRoles: readonly UiA11yRole[] = ["button", "link", "tab", "menuitem"] as const
export const uiA11yKeyboardActions: readonly UiA11yKeyboardAction[] = ["Enter", "Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Escape", "Tab"] as const

// Button-specific exports (aliased for backward compatibility)
export const uiButtonSizes = uiSizes
export const uiButtonIntents = uiIntents
export const uiButtonTones = uiTones
export const uiButtonEmphases = uiEmphases

// Button-specific emphasis (DDD-based)
export type UiButtonEmphasis = "low" | "medium" | "high"

// Legacy type aliases for backward compatibility (deprecated)
export type UiButtonSize = UiVariantSize
export type UiButtonIntent = UiVariantIntent
export type UiButtonTone = UiVariantTone

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
): Promise<{ contract: ButtonContract | null; success: boolean; message: string }> {
  const useCase = getCreateButtonContractUseCase();
  return useCase.execute(request);
}
