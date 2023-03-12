import ts from "typescript";
import { getId } from "../ast/getId";
import { NodeIndex } from "../matcher/engine/NodeIndex";
import { PatternMatcherEngine } from "../matcher/engine/PatternMatcherEngine";
import { parse } from "../parser/parse";
import { ScriptMetadata } from "../matcher/engine/ScriptMetadata";
import { Augmentation } from "./Augmentation";
import { SourceFileNodeAugmentation } from "./SourceFileNodeAugmentation";

export function createParseAndAugmentFunction(
  augmentations: Array<Augmentation<unknown>> | undefined = [],
  fileName = "test.js"
) {
  return async (sourceCode: string) => {
    const parseResult = (await parse(fileName, undefined, sourceCode))[0];

    if (parseResult == null) {
      throw new Error(`could not parse source`);
    }

    const nodes = new NodeIndex(parseResult.sourceFile);

    const sourceModuleKind = parseResult.getSourceModuleKind(nodes);

    const scriptMetadata = new ScriptMetadata({
      extension: parseResult.extension,
      range: parseResult.range,
      language: parseResult.language,
      scriptKind: parseResult.scriptKind,
      sourceModuleKind: sourceModuleKind.id,
      areTopLevelVariablesLocal: parseResult.areTopLevelVariablesLocal,
      isVarGlobal: sourceModuleKind.isVarGlobal,
    });

    const matcherEngine = new PatternMatcherEngine(
      nodes,
      scriptMetadata,
      parseResult.typeSystem,
      augmentations
    );

    await matcherEngine.augment(
      (
        augmentation: SourceFileNodeAugmentation<any>,
        node: ts.Node,
        error: any
      ) => {
        console.error(augmentation.id, getId(node), error.message ?? error);
      }
    );

    return {
      sourceFile: parseResult.sourceFile as any,
      context: matcherEngine.createContext(),
      matcherEngine,
    };
  };
}
