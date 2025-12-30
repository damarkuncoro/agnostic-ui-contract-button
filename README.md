# agnostic-ui-contract-button

Framework-agnostic button contract for Agnostic UI.

## Features
- Typed variants
- Explicit state
- A11y-first
- Zero CSS

## Usage
(import example)

## Design Rules
- Variant ≠ State
- State ≠ A11y

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
