import { Definition } from "./Definition";
import { Emitter } from "./Emitter";
import { getPropertyType } from "./Property";
import { toCamelCase, toPascalCase } from "./TextUtils";

export function generateMatcher(definition: Definition) {
  const emitter = new Emitter();

  emitter.emitCopyrightHeader();

  emitter.emit(`import ts from "typescript";
import * as p from "../predicate";
import * as b from "../builder";
import { Context } from "../engine/Context";`);

  emitter.emit(`

export function match${toPascalCase(definition.name)}({
`);

  for (const property of definition.properties) {
    emitter.emit(`  ${property.name} = undefined,
`);
  }

  emitter.emit(`  parent = undefined,
  constraints = undefined,
  debugName = "${toCamelCase(definition.name)}",
}: {
`);

  for (const property of definition.properties) {
    const propertyType = getPropertyType(
      property,
      false,
      "ts.NodeArray",
      "undefined"
    );

    const type = isPrimitive(property.type)
      ? `p.PrimitivePredicateLike<${propertyType}, Context>`
      : `p.OptionalPredicate<${propertyType}, Context>`;

    emitter.emit(`  ${property.name}?: ${type};
`);
  }

  emitter.emit(`  parent?: p.OptionalPredicate<ts.Node, Context>;
  constraints?: p.OptionalPredicateArray<ts.${definition.name}, Context>;
  debugName?: string;
} = {}) {
  return b.object(
    debugName,
    ts.is${definition.name},
`);

  for (const property of definition.properties) {
    const methodName = property.optional
      ? isPrimitive(property.type)
        ? `optionalPrimitiveProperty`
        : `optionalProperty`
      : isPrimitive(property.type)
      ? `mandatoryPrimitiveProperty`
      : `mandatoryProperty`;

    emitter.emit(`    b.${methodName}("${property.name}", ${property.name}),
`);
  }

  emitter.emit(`    b.mandatoryProperty("parent", parent),
    b.constraints(constraints),
  );
}`);

  emitter.writeToFile(`src/matcher/ast/match${definition.name}.generated.ts`);
}

function isPrimitive(propertyType: string | string[]) {
  return propertyType === "string" || propertyType === "boolean";
}
