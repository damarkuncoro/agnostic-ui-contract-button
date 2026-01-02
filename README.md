# @damarkuncoro/agnostic-ui-contract-button

Framework-agnostic button component contract for Agnostic UI. This package defines the semantic interface for button components, built on top of the core contract system.

## Features

- ✅ **Semantic Variants**: Size, intent, tone, and emphasis using core contract arrays
- ✅ **Component-Specific Restrictions**: Button-appropriate subsets of core variants
- ✅ **Explicit State Management**: Loading, disabled, and interaction states
- ✅ **Accessibility-First**: ARIA roles, keyboard actions, and screen reader support
- ✅ **Zero Implementation**: Pure TypeScript contracts, no CSS or DOM logic
- ✅ **Type-Safe**: Full TypeScript support with semantic validation

## Installation

```bash
npm install @damarkuncoro/agnostic-ui-contract-button
```

## Usage

Import button contract types and semantic arrays:

```typescript
import {
  // Core contract types and arrays
  uiSizes,
  uiIntents,
  uiTones,
  uiEmphases,

  // Button-specific types and arrays
  UiButtonSize,
  UiButtonIntent,
  UiButtonTone,
  UiButtonEmphasis,
  uiButtonSizes,
  uiButtonIntents,
  uiButtonTones,
  uiButtonEmphases,

  // Button contracts
  UiButtonProps,
  UiButtonVariant,
  UiButtonState,
  UiButtonA11y
} from '@damarkuncoro/agnostic-ui-contract-button';

// Use in component definitions
interface MyButtonProps extends UiButtonProps {
  // Additional framework-agnostic props
  onPress?: () => void;
  children?: unknown;
}

// Type-safe button component
const MyButton = ({
  size = "md",        // illustrative default; actual defaults resolved in base
  intent = "primary", // illustrative default; actual defaults resolved in base
  tone = "solid",     // illustrative default; actual defaults resolved in base
  emphasis = "medium", // illustrative default; actual defaults resolved in base
  ...props
}: MyButtonProps) => {
  // Implementation here - framework-specific bindings handled in provider packages
};

// Note: Framework-specific bindings (React onClick, Vue @click, etc.)
// are implemented in the respective provider packages, not in contracts.
```

## Semantic Arrays

This package provides button-specific semantic arrays that are subsets of the core contract arrays:

### Button Sizes
```typescript
uiButtonSizes // ["xs", "sm", "md", "lg", "xl"] - all core sizes available
```

### Button Intents
```typescript
uiButtonIntents // ["primary", "secondary", "success", "warning", "danger", "neutral"] - all core intents available
```

### Button Tones
```typescript
uiButtonTones // ["solid", "soft", "outline", "ghost", "link"] - all core tones available
```

### Button Emphasis
```typescript
uiButtonEmphases // ["low", "medium", "high"] - all core emphasis levels available
```

## Architecture

```
contract-core (semantic authority)
   ↓ extends
contract-button (component contract)
   ↓ implements
base-button (logic + composition)
   ↓ styles
skin-tailwind (CSS implementation)
   ↓ renders
provider-react (framework adapter)
```

## Design Rules

- ✅ **Variant ≠ State**: Visual appearance vs. behavioral state
- ✅ **State ≠ A11y**: Component state vs. accessibility attributes
- ✅ **Semantic First**: All values are semantic identifiers, not physical values
- ✅ **Contract Inheritance**: Extends core contracts with component-specific restrictions
- ✅ **Type Safety**: All props are strongly typed with semantic validation

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