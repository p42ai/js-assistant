import { Binding, Match } from "@p42/engine";
import ts from "typescript";

export interface ExtractJsxElementCandidate
  extends Match<
    ts.JsxElement | ts.JsxSelfClosingElement | ts.JsxFragment,
    Record<string, never>,
    {
      typeName: "element" | "fragment";
      sortedBindings: Array<Binding>;
      parameterTypes:
        | Array<{
            name: string;
            isUnknown: boolean;
            typeNode: ts.TypeNode;
          }>
        | undefined;
    }
  > {}
