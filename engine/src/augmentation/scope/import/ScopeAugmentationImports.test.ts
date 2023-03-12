import { createParseAndAugmentFunction } from "../../createParseAndAugmentFunction";
import { Scope } from "../Scope";
import { ScopeAugmentation } from "../ScopeAugmentation";

async function parseAndAugment(source: string) {
  const { sourceFile, context } = await createParseAndAugmentFunction([
    ScopeAugmentation,
  ])(source);

  return [sourceFile as any, context.getScope(sourceFile)];
}

function expectImportInformation(scope: Scope, name: string) {
  const importInformation = scope.bindings.get(name)?.importInformation;

  return expect({
    isDefault: importInformation?.isDefault,
    isNamespace: importInformation?.isNamespace,
    isDynamic: importInformation?.isDynamic,
    isStatic: importInformation?.isStatic,
    isCommonJSRequire: importInformation?.isCommonJSRequire,
    isESMImport: importInformation?.isESMImport,
    staticSource: importInformation?.staticSource,
  });
}

describe("ScopeAugmentation - imports", () => {
  it("import 'import Module'", async () => {
    const [ast, mainScope] = await parseAndAugment(
      `import Module from "@scope/module";`
    );

    expectImportInformation(mainScope, "Module").toStrictEqual({
      isDefault: true,
      isNamespace: false,
      isDynamic: false,
      isStatic: true,
      isCommonJSRequire: false,
      isESMImport: true,
      staticSource: "@scope/module",
    });
  });

  it("import 'import Module' with NoSubstitutionTemplateLiteral", async () => {
    const [ast, mainScope] = await parseAndAugment(
      `import Module from \`@scope/module\`;`
    );

    expectImportInformation(mainScope, "Module").toStrictEqual({
      isDefault: true,
      isNamespace: false,
      isDynamic: false,
      isStatic: true,
      isCommonJSRequire: false,
      isESMImport: true,
      staticSource: "@scope/module",
    });
  });

  xit("require 'const Module = require(\"@scope/module\");'", async () => {
    const [ast, mainScope] = await parseAndAugment(
      `const Module = require("@scope/module");`
    );

    expectImportInformation(mainScope, "Module").toStrictEqual({
      isDefault: false,
      isDynamic: false,
      isNamespace: true,
      isStatic: true,
      isCommonJSRequire: true,
      isESMImport: false,
      staticSource: "@scope/module",
    });
  });

  // TODO require dynamic
  // TODO import dynamic
  // TODO import alias
  // TODO import mixed
  // TODO import parts
  // TODO import namespace
  // TODO require deconstructed
});
