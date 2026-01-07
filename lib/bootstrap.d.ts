/**
 * Contract-Button Application Bootstrap
 * Sets up dependency injection container for button operations using DDD principles
 */
import { CreateButtonUseCase } from './application/use-cases/CreateButtonUseCase';
import { ButtonAccessibilityValidator } from './infrastructure/validators/ButtonAccessibilityValidator';
import { IButtonValidator } from './domain/button/services/IButtonValidator';
declare class ButtonServiceContainer {
    private static instance;
    private services;
    private constructor();
    static getInstance(): ButtonServiceContainer;
    private initializeServices;
    get<T>(serviceName: string): T;
    getCreateButtonUseCase(): CreateButtonUseCase;
    getButtonAccessibilityValidator(): ButtonAccessibilityValidator;
    getButtonValidators(): IButtonValidator[];
}
export declare const buttonServiceContainer: ButtonServiceContainer;
export declare function getCreateButtonUseCase(): CreateButtonUseCase;
export declare function getButtonAccessibilityValidator(): ButtonAccessibilityValidator;
export declare function getButtonValidators(): IButtonValidator[];
export declare function getButtonService<T>(serviceName: string): T;
export {};
//# sourceMappingURL=bootstrap.d.ts.map