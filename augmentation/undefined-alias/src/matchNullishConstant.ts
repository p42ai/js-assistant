import { matchers as m, predicates as p } from "@p42/engine";
import { undefinedAlias } from ".";

const { ast } = m;

export const matchNullishConstant = p.or(ast.nullKeyword, undefinedAlias());
