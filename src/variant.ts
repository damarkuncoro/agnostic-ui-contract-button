// src/variant.ts

import type {
  UiSizeVariant,
  UiIntentVariant,
  UiToneVariant,
  UiEmphasisVariant,
} from "@damarkuncoro/agnostic-ui-contract-core"

export interface UiButtonVariant
  extends UiSizeVariant,
    UiIntentVariant,
    UiToneVariant,
    UiEmphasisVariant {}
