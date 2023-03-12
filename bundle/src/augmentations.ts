import ArrayLoopAugmentation from "@p42/augmentation-array-loop";
import ConditionalAssignmentAugmentation from "@p42/augmentation-conditional-assignment";
import EqualityCheckAugmentation from "@p42/augmentation-equality-check";
import FunctionDirectiveAugmentation from "@p42/augmentation-function-directive";
import LodashCallAugmentation from "@p42/augmentation-lodash-call";
import NullishCheckAugmentation from "@p42/augmentation-nullish-check";
import UndefinedAliasAugmentation from "@p42/augmentation-undefined-alias";
import UndefinedCheckAugmentation from "@p42/augmentation-undefined-check";
import {
  AncestorAugmentation,
  Augmentation,
  BindingReferenceAugmentation,
  CommentAugmentation,
  DescendantAugmentation,
  NamedFunctionCallsAugmentation,
  ScopeAugmentation,
  TrueParentAugmentation,
} from "@p42/engine";

export const AUGMENTATIONS: Array<Augmentation<any>> = [
  TrueParentAugmentation,
  AncestorAugmentation,
  DescendantAugmentation,
  CommentAugmentation,
  ScopeAugmentation,
  BindingReferenceAugmentation,
  NamedFunctionCallsAugmentation,
  UndefinedAliasAugmentation,
  ArrayLoopAugmentation,
  ConditionalAssignmentAugmentation,
  EqualityCheckAugmentation,
  FunctionDirectiveAugmentation,
  NullishCheckAugmentation,
  UndefinedCheckAugmentation,
  LodashCallAugmentation,
];
