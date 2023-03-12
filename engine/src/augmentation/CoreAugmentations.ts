import { AncestorAugmentation } from "./ancestor/AncestorAugmentation";
import { Augmentation } from "./Augmentation";
import { CommentAugmentation } from "./comment/CommentAugmentation";
import { DescendantAugmentation } from "./descendant/DescendantAugmentation";
import { NamedFunctionCallsAugmentation } from "./named-function-calls/NamedFunctionCallsAugmentation";
import { BindingReferenceAugmentation } from "./scope/reference/BindingReferenceAugmentation";
import { ScopeAugmentation } from "./scope/ScopeAugmentation";
import { TrueParentAugmentation } from "./true-parent/TrueParentAugmentation";

export const CoreAugmentations = [
  TrueParentAugmentation,
  AncestorAugmentation,
  DescendantAugmentation,
  CommentAugmentation,
  ScopeAugmentation,
  BindingReferenceAugmentation,
  NamedFunctionCallsAugmentation,
] as Array<Augmentation<unknown>>;
