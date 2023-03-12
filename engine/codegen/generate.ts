import * as fs from "fs";
import * as path from "path";
import { Definition } from "./Definition";
import { generateCopyShallow } from "./generateCopyShallow";
import { generateForEachChildWithAttribute } from "./generateForEachChildWithAttribute";
import { generateIsNodeStructureEqual } from "./generateIsNodeStructureEqual";
import { generateMatcher } from "./generateMatcher";
import { generateTransformedNodeTree } from "./generateTransformedNodeTree";
import { generateUpdateNode } from "./generateUpdateNode";

const directory = `src/ast/definition/`;

const definitionFiles = fs
  .readdirSync(directory, {
    withFileTypes: true,
  })
  .filter((entry) => entry.isFile())
  .map((entry) => path.resolve(directory, entry.name));

const definitions: Array<Definition> = [];

for (const definitionFile of definitionFiles) {
  definitions.push(
    JSON.parse(fs.readFileSync(definitionFile).toString()) as Definition
  );
}

for (const definition of definitions) {
  if (definition.generate?.matcher) {
    generateMatcher(definition);
  }
}

generateForEachChildWithAttribute(definitions);
generateIsNodeStructureEqual(definitions);
generateUpdateNode(definitions);
generateCopyShallow(definitions);
generateTransformedNodeTree(definitions);
