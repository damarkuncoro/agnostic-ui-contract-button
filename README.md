# @damarkuncoro/agnostic-ui-contract-button

## 🏛️ **Domain-Driven Design (DDD) Button Component Contract**

Enterprise-grade button component contract implementing **Domain-Driven Design (DDD)** principles with comprehensive business logic, accessibility compliance, and state management. Built on top of the contract-core foundation with full backward compatibility.

## ✨ **Key Features**

### **🏛️ DDD Architecture**
- ✅ **Domain Layer**: `Button` entity with rich business logic and state management
- ✅ **Application Layer**: `CreateButtonUseCase` with orchestration and validation
- ✅ **Infrastructure Layer**: `ButtonAccessibilityValidator` with WCAG compliance
- ✅ **Clean Architecture**: Proper separation with dependency injection

### **🔒 Business Logic Protection**
- ✅ **Button Entity**: Comprehensive button lifecycle with state transitions
- ✅ **ButtonType Value Object**: Immutable button types with semantic validation
- ✅ **Accessibility Validation**: WCAG 2.1 AA compliance with automated checking
- ✅ **Domain Events**: Observable button operations (`ButtonCreatedEvent`, `ButtonClickedEvent`)

### **🎯 DDD-Only Architecture**
- ✅ **Pure Domain-Driven Design**: Enterprise-grade DDD implementation
- ✅ **Clean Architecture**: No legacy code dependencies
- ✅ **Future-Proof**: Modern patterns for long-term maintainability

### **♿ Accessibility First**
- ✅ **WCAG 2.1 AA**: Full compliance with automated validation
- ✅ **Keyboard Navigation**: Proper focus management and keyboard support
- ✅ **Screen Reader**: ARIA roles and semantic markup validation
- ✅ **Color Contrast**: Automated contrast ratio validation

## 📦 **Installation**

```bash
npm install @damarkuncoro/agnostic-ui-contract-button
```

## 🚀 **DDD Architecture Usage**

### **Modern DDD APIs (Recommended)**

```typescript
import {
  Button,
  ButtonState,
  ButtonEmphasis,
  ButtonType,
  CreateButtonUseCase,
  getCreateButtonUseCase,
  createButtonDDD,
  validateButtonDDD
} from '@damarkuncoro/agnostic-ui-contract-button';

// Create button using DDD use case
const useCase = getCreateButtonUseCase();
const result = await useCase.execute({
  buttonType: 'submit',
  emphasis: ButtonEmphasis.HIGH,
  hasIcon: true,
  iconPosition: 'start'
});

const button = result.button;

// Business logic operations
button.click('primary');
button.changeState(ButtonState.LOADING);

// Domain events
const events = button.getDomainEvents();
console.log('Button events:', events);

// Accessibility validation
const accessibilityResult = button.validateAccessibility();
if (!accessibilityResult.isAccessible) {
  console.log('Violations:', accessibilityResult.violations);
}
```

### **Type Aliases for Compatibility**

```typescript
import {
  // Type aliases from contract-box
  UiButtonSize,
  UiButtonIntent,
  UiButtonTone,
  UiButtonEmphasis
} from '@damarkuncoro/agnostic-ui-contract-button';

// These are type aliases for backward compatibility
// Prefer using the DDD Button entity directly
```

## 🏗️ **Architecture Overview**

### **DDD Layer Structure**
```
contract-button/
├── domain/                    # Domain Layer
│   ├── button/
│   │   ├── entities/
│   │   │   └── Button.ts     # Button entity with business logic
│   │   └── services/
│   │       └── IButtonValidator.ts
│   └── shared/
│       ├── BaseEntity.ts     # Shared kernel
│       ├── ValueObject.ts
│       ├── events/
│       │   └── DomainEvent.ts
│       └── value-objects/
│           └── ButtonType.ts # ButtonType VO
├── application/               # Application Layer
│   └── use-cases/
│       └── CreateButtonUseCase.ts
├── infrastructure/            # Infrastructure Layer
│   └── validators/
│       └── ButtonAccessibilityValidator.ts
└── bootstrap.ts              # Dependency Injection
```

### **Contract Hierarchy**
```
contract-core (foundation)
   ↓ extends
contract-button (DDD + legacy)
   ↓ implements
base-button (logic + composition)
   ↓ styles
skin-tailwind (CSS implementation)
   ↓ renders
provider-react (framework adapter)
```

## 🎯 **Business Logic Features**

### **Button Entity Capabilities**
- **State Management**: `idle` → `hovered` → `pressed` → `focused` → `disabled` → `loading`
- **Click Tracking**: Automatic click count and last interaction timestamp
- **Accessibility Validation**: Built-in WCAG compliance checking
- **Icon Management**: Position validation and accessibility requirements
- **Emphasis Levels**: `low`, `medium`, `high` with semantic meaning

### **Domain Events**
```typescript
// Observable button operations
ButtonCreatedEvent        // Button instantiation
ButtonClickedEvent        // User interactions
ButtonStateChangedEvent   // State transitions
ButtonAccessibilityValidatedEvent // Compliance checks
```

### **Validation Rules**
- **Business Rules**: Submit buttons require high emphasis
- **Accessibility**: Icons require proper labeling
- **State Transitions**: Invalid state changes prevented
- **Type Safety**: Button types validated at creation

## 🎯 **Usage Patterns**

### **Direct DDD Entity Usage**
```typescript
// Create and use Button entity directly
const button = Button.create({
  buttonType: 'submit',
  emphasis: ButtonEmphasis.HIGH,
  hasIcon: true
});

// Business operations
button.click('primary');
const isAccessible = button.validateAccessibility().isAccessible;
```

### **Use Case Orchestration**
```typescript
// Use application services for complex operations
const useCase = getCreateButtonUseCase();
const result = await useCase.execute({
  buttonType: 'submit',
  emphasis: ButtonEmphasis.HIGH
});
```

## 📊 **Quality Metrics**

| Metric | Legacy Architecture | DDD Architecture | Improvement |
|--------|-------------------|------------------|-------------|
| **Business Logic** | Scattered | Centralized in Button entity | ✅ **Enterprise-grade** |
| **Type Safety** | Basic TypeScript | Rich domain types | ✅ **Compile-time guarantees** |
| **Testability** | Hard to isolate | DI-enabled testing | ✅ **Comprehensive coverage** |
| **Maintainability** | Functional approach | Domain entities | ✅ **Long-term sustainability** |
| **Accessibility** | Manual checking | Automated WCAG validation | ✅ **Compliance assurance** |
| **State Management** | External | Encapsulated in entity | ✅ **Data integrity** |

## 🎨 **Standard Button Configurations**

### **DDD Factory Methods**
```typescript
import { createStandardSubmitButton, createStandardCancelButton } from '@damarkuncoro/agnostic-ui-contract-button';

// Pre-configured button inputs
const submitInput = createStandardSubmitButton({ hasIcon: true });
const cancelInput = createStandardCancelButton();

// Use with use case
const submitButton = await getCreateButtonUseCase().execute(submitInput);
```

### **Legacy Standard Configurations**
```typescript
import { getStandardButtonConfigs } from '@damarkuncoro/agnostic-ui-contract-button';

const configs = getStandardButtonConfigs();
// { submit: { buttonType: 'submit', emphasis: 'high' }, ... }
```

## 🔒 **SOLID Principles Implementation**

- ✅ **Single Responsibility**: Each class has one clear purpose
- ✅ **Open/Closed**: New validators extend without modifying existing code
- ✅ **Liskov Substitution**: All validators implement `IButtonValidator`
- ✅ **Interface Segregation**: Specific interfaces for button validation
- ✅ **Dependency Inversion**: Application layer depends on abstractions

## 🧪 **Testing Examples**

### **Unit Testing Domain Logic**
```typescript
describe('Button Entity', () => {
  it('should prevent clicking disabled button', () => {
    const button = Button.create({ buttonType: 'button' });
    button.changeState(ButtonState.DISABLED);

    expect(() => button.click()).toThrow('Cannot click a disabled button');
  });

  it('should validate accessibility requirements', () => {
    const button = Button.create({
      buttonType: 'button',
      hasIcon: true
    });

    const result = button.validateAccessibility();
    expect(result.isAccessible).toBe(false);
    expect(result.violations).toContain('Buttons with icons must be accessible');
  });
});
```

### **Integration Testing Use Cases**
```typescript
describe('CreateButtonUseCase', () => {
  it('should create valid button with accessibility validation', async () => {
    const useCase = new CreateButtonUseCase([new ButtonAccessibilityValidator()]);

    const result = await useCase.execute({
      buttonType: 'submit',
      emphasis: ButtonEmphasis.HIGH
    });

    expect(result.isValid).toBe(true);
    expect(result.button.buttonType.value).toBe('submit');
  });
});
```

## 📚 **API Reference**

### **DDD APIs**
- `Button` - Domain entity with business logic
- `ButtonType` - Value object for button types
- `CreateButtonUseCase` - Application service for button creation
- `ButtonAccessibilityValidator` - WCAG compliance validator
- `getCreateButtonUseCase()` - Dependency injection accessor

### **Type Aliases**
- `UiButtonSize` - Type alias for button sizes
- `UiButtonIntent` - Type alias for button intents
- `UiButtonTone` - Type alias for button tones
- `UiButtonEmphasis` - Button emphasis levels

## 🚀 **Performance & Bundle Size**

- **Tree Shaking**: Only import what you need
- **Lazy Loading**: Domain logic loaded on demand
- **Minimal Dependencies**: Zero runtime dependencies
- **Type-Only Imports**: No runtime overhead for types

## 🔄 **Version Compatibility**

- **v2.x**: Pure DDD architecture (current)
- **Breaking Change**: Legacy APIs removed for clean DDD implementation
- **Future Versions**: DDD-first development approach

## 🤝 **Contributing**

1. **DDD First**: New features implemented using DDD patterns
2. **Backward Compatible**: Legacy APIs preserved
3. **Test Coverage**: Domain logic fully tested
4. **Accessibility**: WCAG compliance maintained

## 📄 **License**

MIT License - see LICENSE file for details.

---

## 🎯 **DDD Transformation Complete**

**Contract-Button Package**: ✅ **Pure Enterprise-grade DDD Architecture**

- ✅ **Domain Entity**: Rich Button entity with encapsulated business logic
- ✅ **Value Objects**: Immutable ButtonType with validation
- ✅ **Use Cases**: CreateButtonUseCase with orchestration
- ✅ **Infrastructure**: AccessibilityValidator with WCAG compliance
- ✅ **Clean Architecture**: Proper layer separation
- ✅ **DDD-Only**: No legacy code dependencies
- ✅ **SOLID Principles**: All five principles implemented
- ✅ **Type Safety**: Full TypeScript with domain validation
- ✅ **Testability**: Dependency injection enabled
- ✅ **Future-Proof**: Modern patterns for long-term maintainability

**🏛️ Pure DDD button contract with enterprise excellence! 🚀✨**

## Releasing

To release a new version:

1. Update the version in `package.json`
2. Commit the changes
3. Create and push a git tag: `git tag v1.0.1 && git push origin v1.0.1`

The GitHub Actions workflow will automatically:
- Build the package
- Publish to npm
- Create a GitHub release with the built tarball

### Prerequisites

- `NPM_TOKEN` secret must be configured in GitHub repository settings
- The token should have publish permissions for the `@damarkuncoro` scope

### Steps

1. **Create a Release Branch**:
   ```bash
   git checkout -b release/v1.0.1
   ```

2. **Update Version**:
   Edit `package.json` to set the new version (e.g., `"version": "1.0.1"`).

3. **Commit Changes**:
   ```bash
   git add package.json
   git commit -m "Release v1.0.1"
   ```

4. **Push to Remote**:
   ```bash
   git push origin release/v1.0.1
   ```

5. **Create a Pull Request**:
   Open a PR from `release/v1.0.1` to `main` and get it approved.

6. **Merge and Tag**:
   Once merged, create a git tag for the release:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

7. **Monitor Workflow**:
   The GitHub Actions workflow will automatically build, publish, and create a release.