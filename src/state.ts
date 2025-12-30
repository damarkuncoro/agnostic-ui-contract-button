// src/state.ts

import type {
  UiDisabledState,
  UiLoadingState,
} from "@damarkuncoro/agnostic-ui-contract-core"

export interface UiButtonState
  extends UiDisabledState,
    UiLoadingState {}
