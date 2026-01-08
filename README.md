# @damarkuncoro/agnostic-ui-contract-button

## 🏛️ **Domain-Driven Design (DDD) Button Component Contract**

**This is a DDD contract package for button components.** This package extends the contract-core foundation with button-specific business logic, accessibility compliance, and state management using proper Domain-Driven Design principles.

## 🏗️ **Architecture Overview**

```
@damarkuncoro/agnostic-ui-contract-core (foundation)
    ↓ extends
@damarkuncoro/agnostic-ui-contract-box (container contracts)
    ↓ extends
@damarkuncoro/agnostic-ui-contract-button (DDD button contracts)
```

## 📦 **DDD Architecture Structure**

```
contract-packages/agnostic-ui-contract-button/
├── src/
│   ├── index.ts                          # Main exports
│   ├── bootstrap.ts                      # Dependency Injection
│   ├── domain/
│   │   ├── contract/
│   │   │   ├── entities/
│   │   │   │   └── ButtonContract.ts     # Button entity with business logic
│   │   │   ├── services/
│   │   │   │   └── IButtonContractFactory.ts
│   │   │   └── value-objects/
│   │   │       └── ButtonVariant.ts      # ButtonVariant VO
│   │   └── shared/
│   │       ├── BaseEntity.ts             # Re-export from core
│   │       ├── ValueObject.ts            # Re-export from core
│   │       └── events/
│   │           └── ButtonEvents.ts       # Domain events
│   ├── application/
│   │   └── use-cases/
│   │       └── CreateButtonContractUseCase.ts
│   └── infrastructure/
│       └── factories/
│           └── ButtonContractFactory.ts
└── package.json
```

## 🏛️ **DDD Layer Responsibilities**

### **Domain Layer - Why It Matters:**
The domain layer contains the core business logic and rules. Entities represent business concepts with identity and behavior, while Value Objects represent immutable descriptive aspects. This separation ensures business rules are preserved and testable independently of infrastructure concerns.

- **Entities**: `ButtonContract` - Represents a button component contract with identity and behavior
- **Value Objects**: `ButtonVariant` - Immutable descriptive aspects of button variants
- **Domain Services**: `IButtonContractFactory` - Business logic coordination

### **Application Layer - Why It Matters:**
Use Cases orchestrate complex business operations and coordinate between domain objects. They encapsulate application-specific logic while keeping the domain layer pure and focused on business rules.

- **Use Cases**: `CreateButtonContractUseCase` - Orchestrates button contract creation

### **Infrastructure Layer - Why It Matters:**
Infrastructure concerns (persistence, external services, frameworks) are isolated here through interfaces and adapters. This allows the domain and application layers to remain independent and testable.

- **Factories**: `ButtonContractFactory` - Infrastructure implementations

## 🚀 **Installation**

```bash
npm install @damarkuncoro/agnostic-ui-contract-button
# or
pnpm add @damarkuncoro/agnostic-ui-contract-button
```

## 🏛️ **DDD Architecture Usage**

### **Creating a Button Contract**

```typescript
import { 
  ButtonContract, 
  ButtonVariant,
  CreateButtonContractUseCase,
  getCreateButtonContractUseCase 
} from '@damarkuncoro/agnostic-ui-contract-button';

// Using the entity directly
const contract = ButtonContract.create({
  name: 'my-button',
  variants: [
    ButtonVariant.createSizeVariant(),
    ButtonVariant.createIntentVariant()
  ],
  props: [
    { name: 'disabled', type: 'boolean', required: false, default: false }
  ],
  accessibility: {
    role: 'button',
    keyboard: ['Enter', 'Space'],
    focusable: true
  }
});

// Using the use case
const useCase = getCreateButtonContractUseCase();
const result = await useCase.execute({
  name: 'primary-button',
  variants: [
    { type: 'size', values: ['sm', 'md', 'lg'] },
    { type: 'intent', values: ['primary', 'secondary'] }
  ]
});

console.log('Contract created:', result.contract?.name);
console.log('Accessible:', result.accessibility.isAccessible);
```

### **Using Button Variants**

```typescript
import { ButtonVariant } from '@damarkuncoro/agnostic-ui-contract-button';

// Create standard variants
const sizeVariant = ButtonVariant.createSizeVariant();
console.log(sizeVariant.values); // ['xs', 'sm', 'md', 'lg', 'xl']

const intentVariant = ButtonVariant.createIntentVariant();
console.log(intentVariant.values); // ['primary', 'secondary', 'success', ...]

// Custom variants
const customVariant = ButtonVariant.create('custom', ['option1', 'option2']);
```

### **Domain Events**

```typescript
import { 
  ButtonContractCreatedEvent,
  ButtonAccessibilityValidatedEvent 
} from '@damarkuncoro/agnostic-ui-contract-button';

// Listen for domain events
const contract = ButtonContract.create({ name: 'my-button' });
const events = contract.getDomainEvents();

events.forEach(event => {
  if (event instanceof ButtonContractCreatedEvent) {
    console.log('Contract created:', event.contractName);
  }
});
```

## 🏢 **Application Layer Usage**

### **CreateButtonContractUseCase**

```typescript
import { CreateButtonContractUseCase } from '@damarkuncoro/agnostic-ui-contract-button';
import { ButtonContractFactory } from '@damarkuncoro/agnostic-ui-contract-button';

const factory = new ButtonContractFactory();
const useCase = new CreateButtonContractUseCase(factory);

const result = await useCase.execute({
  name: 'submit-button',
  variants: [
    { type: 'size', values: ['sm', 'md', 'lg'] },
    { type: 'intent', values: ['primary'] }
  ],
  props: [
    { name: 'disabled', type: 'boolean', default: false }
  ]
});

if (result.success) {
  console.log('Button contract created!');
} else {
  console.error('Failed:', result.message);
}
```

## 🛠️ **Infrastructure Layer**

### **ButtonContractFactory**

```typescript
import { ButtonContractFactory } from '@damarkuncoro/agnostic-ui-contract-button';

const factory = new ButtonContractFactory();

// Create standard button contract
const standardContract = factory.createStandardButtonContract('standard-button');

// Create custom button contract
const customContract = factory.createContract({
  name: 'custom-button',
  variants: [
    { type: 'size', values: ['sm', 'md', 'lg'] }
  ]
});
```

## 📚 **Architecture Benefits**

| Aspect | Benefit |
|--------|---------|
| **SOLID Principles** | Single responsibility, dependency injection, interface segregation |
| **Testability** | Dependency injection enables comprehensive unit testing |
| **Maintainability** | Organized code structure that's easy to extend |
| **Domain Integrity** | Business rules properly encapsulated and validated |
| **Loose Coupling** | Event-driven architecture with proper domain modeling |

## 🎯 **Best Practices**

### **1. Use Domain Entities for Business Logic**
```typescript
// ✅ Good: Use domain entities with proper validation
const contract = ButtonContract.create({
  name: 'my-button',
  variants: [ButtonVariant.createSizeVariant()]
});
```

### **2. Use Value Objects for Immutable Data**
```typescript
// ✅ Good: Use value objects for validated data
const variant = ButtonVariant.create('size', ['sm', 'md', 'lg']);
```

### **3. Use Use Cases for Complex Operations**
```typescript
// ✅ Good: Use use cases for orchestration
const useCase = getCreateButtonContractUseCase();
const result = await useCase.execute(request);
```

### **4. Use Dependency Injection**
```typescript
// ✅ Good: Use DI for testability
const factory = new ButtonContractFactory();
const useCase = new CreateButtonContractUseCase(factory);
```

## 🔄 **Migration from Legacy**

### **Legacy Approach (Deprecated)**
```typescript
// ❌ Avoid: Legacy functional approach
import { createContract } from '@damarkuncoro/agnostic-ui-contract-button';
const contract = createContract({ name: 'button', ... });
```

### **DDD Approach (Recommended)**
```typescript
// ✅ Good: DDD approach with proper domain modeling
import { ButtonContract } from '@damarkuncoro/agnostic-ui-contract-button';
const contract = ButtonContract.create({ name: 'button', ... });
```

## 📦 **Related Packages**

- **@damarkuncoro/agnostic-ui-contract-core**: Core DDD foundation
- **@damarkuncoro/agnostic-ui-contract-box**: Box component contracts
- **@damarkuncoro/agnostic-ui-base-button**: Base button implementation

## 🤝 **Contributing**

When adding new button contract features:

1. **Domain Layer**: Place business logic in appropriate domain entities/services
2. **Value Objects**: Use immutable value objects for data validation
3. **Dependency Injection**: Register services in bootstrap container
4. **Domain Events**: Publish events for important business state changes
5. **Testing**: Write unit tests for domain logic, integration tests for use cases

## 📄 **License**

MIT License - see LICENSE file for details.

---

**🏛️ DDD Button Contract Package** - Enterprise-grade Domain-Driven Design for button components.
