export * as AssignmentExpression from "./ast/AssignmentExpression";
export { AssignmentOperatorMapping } from "./ast/AssignmentOperatorMapping";
export * as BinaryExpression from "./ast/BinaryExpression";
export { BinaryOperator } from "./ast/BinaryOperator";
export * as BindingElement from "./ast/BindingElement";
export * as BindingPattern from "./ast/BindingPattern";
export { BLOCK_LIKE_SYNTAX_KINDS, isBlockLike } from "./ast/BlockLike";
export * as BlockTerminatorStatement from "./ast/BlockTerminatorStatement";
export * as Class from "./ast/Class";
export * as Condition from "./ast/Condition";
export { containsComments } from "./ast/containsComments";
export { escapeTextForTemplate } from "./ast/escapeTextForTemplate";
export * as Expression from "./ast/Expression";
export { findClones } from "./ast/findClones";
export { findFunctionLikeChildren } from "./ast/findFunctionLikeChildren";
export { findIdentifierPatternContainer } from "./ast/findIdentifierPatternContainer";
export { findNodeById } from "./ast/findNodeById";
export { findNodesContainingPosition } from "./ast/findNodesContainingPosition";
export { findNodesContainingRange } from "./ast/findNodesContainingRange";
export * as FunctionLike from "./ast/FunctionLike";
export { getBestTargetScope } from "./ast/getBestTargetScope";
export { getBindings, getSortedBindings } from "./ast/getBindings";
export { getBlockChildParent } from "./ast/getBlockChildParent";
export { getDeclarationRoot } from "./ast/getDeclarationRoot";
export { getDeclaredBindings } from "./ast/getDeclaredBindings";
export { getFirstAncestorOrSelfOfKind } from "./ast/getFirstAncestor";
export { getId } from "./ast/getId";
export { getIndicatorText } from "./ast/getIndicatorText";
export { getInitializerExpressions } from "./ast/getInitializerExpressions";
export { getRawText } from "./ast/getRawText";
export { getRelativeTextPosition } from "./ast/getRelativeTextPosition";
export { getSyntaxKindLabel } from "./ast/getSyntaxKindLabel";
export { GlobalProperty } from "./ast/GlobalProperty";
export { hasDescendant } from "./ast/hasDescendant";
export { hasNoExternalBindings } from "./ast/hasNoExternalBindings";
export * as IfStatement from "./ast/IfStatement";
export { isAncestor } from "./ast/isAncestor";
export { isConstantExpression } from "./ast/isConstantExpression";
export { isConstDeclarationList } from "./ast/isConstDeclarationList";
export { isGlobalIdentifier } from "./ast/isGlobalIdentifier";
export { isGlobalNaN } from "./ast/isGlobalNaN";
export { isInsideFunctionScope } from "./ast/isInsideFunctionScope";
export { isLastStatementInBlock } from "./ast/isLastStatementInBlock";
export { isLiteralLike as isLiteral } from "./ast/isLiteralLike";
export { isMethodCallTarget } from "./ast/isMethodCallTarget";
export {
  createIsNodeStructureEqual,
  isNodeStructureEqual,
} from "./ast/isNodeStructureEqual.generated";
export { isPositionInsideNodeText } from "./ast/isPositionInsideNodeText";
export { isSideEffectFree } from "./ast/isSideEffectFree";
export { isSingleQuote } from "./ast/isSingleQuote";
export { JsxElement } from "./ast/JsxElement";
export * as Loop from "./ast/Loop";
export { Modifiers } from "./ast/Modifiers";
export * as Node from "./ast/Node";
export { NodePath, resolveNodePath } from "./ast/NodePath";
export * as NodeRange from "./ast/NodeRange";
export {
  FunctionScopeNode,
  getFunctionScopeNode,
  getScopeNode,
  isFunctionScopeNode,
  isScopeNode,
  ScopeNode,
} from "./ast/ScopeNode";
export * as Statement from "./ast/Statement";
export * as SwitchStatement from "./ast/SwitchStatement";
export * as This from "./ast/This";
export { TypeSystem } from "./ast/TypeSystem";
export * as VariableDeclaration from "./ast/VariableDeclaration";
export * as VariableDeclarationKind from "./ast/VariableDeclarationKind";
export * as VariableDeclarationList from "./ast/VariableDeclarationList";
export * as VariableStatement from "./ast/VariableStatement";
export { visitSelfAndEachDescendant } from "./ast/visitSelfAndEachDescendant";
export { AncestorAugmentation } from "./augmentation/ancestor/AncestorAugmentation";
export { Augmentation } from "./augmentation/Augmentation";
export { AugmentationErrorHandler } from "./augmentation/AugmentationErrorHandler";
// core augmentation
export { CommentAugmentation } from "./augmentation/comment/CommentAugmentation";
export { CoreAugmentations } from "./augmentation/CoreAugmentations";
export { createParseAndAugmentFunction } from "./augmentation/createParseAndAugmentFunction";
export { DescendantAugmentation } from "./augmentation/descendant/DescendantAugmentation";
export { MatchAugmentation } from "./augmentation/MatchAugmentation";
export { NamedFunctionCallsAugmentation } from "./augmentation/named-function-calls/NamedFunctionCallsAugmentation";
export { Binding } from "./augmentation/scope/Binding";
export { BindingKind } from "./augmentation/scope/BindingKind";
export { BindingReference } from "./augmentation/scope/reference/BindingReference";
export { BindingReferenceAugmentation } from "./augmentation/scope/reference/BindingReferenceAugmentation";
export { Scope } from "./augmentation/scope/Scope";
export { ScopeAugmentation } from "./augmentation/scope/ScopeAugmentation";
export { SourceFileNodeAugmentation } from "./augmentation/SourceFileNodeAugmentation";
export { TrueParentAugmentation } from "./augmentation/true-parent/TrueParentAugmentation";
export { CodeAssist, SuggestedCodeAssist } from "./code-assist/CodeAssist";
export { CodeAssistAction } from "./code-assist/CodeAssistAction";
export { CodeAssistApplicationResult } from "./code-assist/CodeAssistApplicationResult";
export { CodeAssistEngine } from "./code-assist/CodeAssistEngine";
export { CodeAssistErrorType } from "./code-assist/CodeAssistErrorType";
export { splitCodeAssistId } from "./code-assist/CodeAssistId";
export * as CodeAssistLevel from "./code-assist/CodeAssistLevel";
export {
  CodeAssistDocumentationCategories,
  CodeAssistMetadata,
  getMetadataCodeActionKinds,
} from "./code-assist/CodeAssistMetadata";
export { CodeAssistType } from "./code-assist/CodeAssistType";
export { Content, FileContent, FixedContent } from "./code-assist/Content";
export {
  EcmaScriptVersion,
  isEcmaScriptVersion,
  isEcmaScriptVersionSupported,
} from "./code-assist/EcmaScriptVersion";
export { EditorAction } from "./code-assist/editor-action/EditorAction";
export { HighlightAction } from "./code-assist/editor-action/HighlightAction";
export { InsertSnippetAction } from "./code-assist/editor-action/InsertSnippetAction";
export { RenameAction } from "./code-assist/editor-action/RenameAction";
export { SelectAction } from "./code-assist/editor-action/SelectAction";
export { FunctionElement } from "./code-assist/FunctionElement";
export { MoveMatch } from "./code-assist/move/MoveMatch";
export { MoveTransformation } from "./code-assist/move/MoveTransformation";
export { CodeAssistProvider, runMultiphase } from "./code-assist/runMultiphase";
export { SourceDocument } from "./code-assist/SourceDocument";
export { SourceDocumentFactory } from "./code-assist/SourceDocumentFactory";
export { asStructuredError } from "./code-assist/StructuredError";
export { NullCodeAssist } from "./code-assist/test/NullCodeAssist";
export * as matchers from "./matcher";
export * as builders from "./matcher/builder";
export * as capture from "./matcher/capture";
export { convertToDebugTree } from "./matcher/debug/debugFindMatches";
export type { DebugResult } from "./matcher/debug/debugFindMatches";
export { deduplicateMatches } from "./matcher/deduplicateMatches";
export { Context } from "./matcher/engine/Context";
export { AnyMatch, Match } from "./matcher/engine/Match";
export { NullMatch } from "./matcher/engine/NullMatch";
export { PatternMatcher } from "./matcher/engine/PatternMatcher";
export { PatternMatcherEngine } from "./matcher/engine/PatternMatcherEngine";
export * as predicates from "./matcher/predicate";
export { calculateNodeMetric } from "./metric/calculateNodeMetric";
export { calculateTokenComplexity } from "./metric/calculateTokenComplexity";
export * as FileTypes from "./parser/file-type/FileTypes";
export { parse } from "./parser/parse";
export { ActionZone, createActionZones } from "./transformation/ActionZone";
export { BinaryExpressionInverter } from "./transformation/BinaryExpressionInverter";
export { BlockedZone } from "./transformation/BlockedZone";
export * as EditorOperation from "./transformation/editor-operation/index";
export { RelativeRange } from "./transformation/editor-operation/RelativeRange";
export * as factory from "./transformation/factory";
export { getRemovalNode } from "./transformation/getRemovalNode";
export {
  InteractiveInput,
  SelectOptionRequest,
} from "./transformation/InteractiveInput";
export * as nameOracle from "./transformation/name-oracle";
export { Edit } from "./transformation/reprinter/Edit";
export { Safety } from "./transformation/safety/Safety";
export { SafetyLevel } from "./transformation/safety/SafetyLevel";
export { SafetyMessageList } from "./transformation/safety/SafetyMessageList";
export { Suggestion } from "./transformation/Suggestion";
export { Transformation } from "./transformation/Transformation";
export { TransformedNodeTree } from "./transformation/TransformedNodeTree.generated";
export { Transformer } from "./transformation/Transformer";
export { PrefixToSuffixTriviaMove } from "./transformation/trivia/PrefixToSuffixTriviaMove";
export { PrefixTriviaEdit } from "./transformation/trivia/PrefixTriviaEdit";
export { PrefixTriviaMove } from "./transformation/trivia/PrefixTriviaMove";
export { PrefixWhitespaceTriviaMove } from "./transformation/trivia/PrefixWhitespaceTriviaMove";
export { SuffixTriviaMove } from "./transformation/trivia/SuffixTriviaMove";
export { SwapPositionPrefixTriviaMove } from "./transformation/trivia/SwapPositionPrefixTriviaMove";
export { SwapPositionSuffixTriviaMove } from "./transformation/trivia/SwapPositionSuffixTriviaMove";
export { SwapPositionTriviaMove } from "./transformation/trivia/SwapPositionTriviaMove";
export { TrailingSeparatorTriviaEdit } from "./transformation/trivia/TrailingSeparatorTriviaEdit";
export { TrailingSeparatorTriviaMove } from "./transformation/trivia/TrailingSeparatorTriviaMove";
export { intersects } from "./util/collection/intersects";
export { isNotNull } from "./util/collection/isNotNull";
export { AbstractCancellationToken } from "./util/concurrency/AbstractCancellationToken";
export { BasicCancellationToken } from "./util/concurrency/BasicCancellationToken";
export { CancellationToken } from "./util/concurrency/CancellationToken";
export { defer } from "./util/concurrency/defer";
export { FunctionCancellationToken } from "./util/concurrency/FunctionCancellationToken";
export { NullCancellationToken } from "./util/concurrency/NullCancellationToken";
export { OperationCanceledException } from "./util/concurrency/OperationCanceledException";
export { sleep } from "./util/concurrency/sleep";
export { ThresholdCancellationToken } from "./util/concurrency/ThresholdCancellationToken";
export { formatTimestampAsLongDate } from "./util/date/formatTimestampAsLongDate";
export { createDiff } from "./util/diff/createDiff";
export { Flags } from "./util/Flags";
export { getFileExtension } from "./util/fs/getFileExtension";
export { getFiles } from "./util/fs/getFiles";
export { isPathReadable } from "./util/fs/isPathReadable";
export { processFiles } from "./util/fs/processFiles";
export { createDocumentationCommentSnippet } from "./util/jsdoc/createDocumentationCommentSnippet";
export { DocumentationCommentContent } from "./util/jsdoc/DocumentationCommentContent";
export {
  NullPerformanceRecorder,
  PerformanceLogLevel,
  PerformanceRecorder,
} from "./util/performance/PerformanceRecorder";
export { checkMerge } from "./util/text/checkMerge";
export { composeCountLabel } from "./util/text/composeCountLabel";
export { convertFirstCharacterToLowerCase } from "./util/text/convertFirstCharacterToLowerCase";
export { convertToSingular } from "./util/text/convertToSingular";
export { countCodePoints } from "./util/text/countCodePoints";
export { escapeChar, unescapeChar } from "./util/text/escapeChar";
export { octalEscapeSequence } from "./util/text/escapeSequences";
export { Range } from "./util/text/Range";
