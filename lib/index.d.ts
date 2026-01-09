import './bootstrap';
export { ButtonContract } from './domain/contract/entities/ButtonContract';
export type { ButtonProp, ButtonAccessibility } from './domain/contract/entities/ButtonContract';
export { ButtonVariant } from './domain/contract/value-objects/ButtonVariant';
export { CreateButtonContractUseCase } from './application/use-cases/CreateButtonContractUseCase';
export type { CreateButtonContractRequest, CreateButtonContractResponse } from './application/use-cases/CreateButtonContractUseCase';
export type { ButtonDomainEvent, ButtonContractCreatedEvent, ButtonStateChangedEvent, ButtonClickedEvent, ButtonAccessibilityValidatedEvent } from './domain/shared/events/ButtonEvents';
export { getButtonContractService, getCreateButtonContractUseCase, getButtonContractValidator, getButtonContractRepository, getVariantFactory } from './bootstrap';
export type { UiVariantSize, UiVariantIntent, UiVariantTone, UiVariantEmphasis, UiA11yRole, UiA11yKeyboardAction } from "@damarkuncoro/agnostic-ui-contract-core";
export { uiSizes as uiButtonSizes, uiIntents as uiButtonIntents, uiTones as uiButtonTones, uiEmphases as uiButtonEmphases, uiA11yRoles, uiA11yKeyboardActions } from "@damarkuncoro/agnostic-ui-contract-core";
export type UiButtonEmphasis = "low" | "medium" | "high";
export type UiButtonSize = import("@damarkuncoro/agnostic-ui-contract-core").UiVariantSize;
export type UiButtonIntent = import("@damarkuncoro/agnostic-ui-contract-core").UiVariantIntent;
export type UiButtonTone = import("@damarkuncoro/agnostic-ui-contract-core").UiVariantTone;
import { ButtonContract } from './domain/contract/entities/ButtonContract';
import type { CreateButtonContractRequest } from './application/use-cases/CreateButtonContractUseCase';
/**
 * Creates a standard button contract using DDD
 */
export declare function createStandardButtonContract(name: string): ButtonContract;
/**
 * Creates a button contract using the use case
 */
export declare function createButtonContract(request: CreateButtonContractRequest): Promise<{
    contract: ButtonContract | null;
    success: boolean;
    message: string;
}>;
//# sourceMappingURL=index.d.ts.map