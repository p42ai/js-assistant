import ts from "typescript";

import { SourceFileCompilerHost } from "../SourceFileCompilerHost";
import { SourceFileContent } from "../SourceFileContent";

import es2015 from "./lib.es2015";
import es2015_collection from "./lib.es2015.collection";
import es2015_core from "./lib.es2015.core";
import es2015_generator from "./lib.es2015.generator";
import es2015_iterable from "./lib.es2015.iterable";
import es2015_promise from "./lib.es2015.promise";
import es2015_proxy from "./lib.es2015.proxy";
import es2015_reflect from "./lib.es2015.reflect";
import es2015_symbol from "./lib.es2015.symbol";
import es2015_symbol_wellknown from "./lib.es2015.symbol.wellknown";
import es2016 from "./lib.es2016";
import es2016_array_include from "./lib.es2016.array.include";
import es2017 from "./lib.es2017";
import es2017_intl from "./lib.es2017.intl";
import es2017_object from "./lib.es2017.object";
import es2017_sharedmemory from "./lib.es2017.sharedmemory";
import es2017_string from "./lib.es2017.string";
import es2017_typedarrays from "./lib.es2017.typedarrays";
import es2018 from "./lib.es2018";
import es2018_asyncgenerator from "./lib.es2018.asyncgenerator";
import es2018_asynciterable from "./lib.es2018.asynciterable";
import es2018_intl from "./lib.es2018.intl";
import es2018_promise from "./lib.es2018.promise";
import es2018_regexp from "./lib.es2018.regexp";
import es2019 from "./lib.es2019";
import es2019_array from "./lib.es2019.array";
import es2019_intl from "./lib.es2019.intl";
import es2019_object from "./lib.es2019.object";
import es2019_string from "./lib.es2019.string";
import es2019_symbol from "./lib.es2019.symbol";
import es2020 from "./lib.es2020";
import es2020_bigint from "./lib.es2020.bigint";
import es2020_date from "./lib.es2020.date";
import es2020_intl from "./lib.es2020.intl";
import es2020_number from "./lib.es2020.number";
import es2020_promise from "./lib.es2020.promise";
import es2020_sharedmemory from "./lib.es2020.sharedmemory";
import es2020_string from "./lib.es2020.string";
import es2020_symbol_wellknown from "./lib.es2020.symbol.wellknown";
import es2021 from "./lib.es2021";
import es2021_intl from "./lib.es2021.intl";
import es2021_promise from "./lib.es2021.promise";
import es2021_string from "./lib.es2021.string";
import es2021_weakref from "./lib.es2021.weakref";
import es2022 from "./lib.es2022";
import es2022_array from "./lib.es2022.array";
import es2022_error from "./lib.es2022.error";
import es2022_intl from "./lib.es2022.intl";
import es2022_object from "./lib.es2022.object";
import es2022_sharedmemory from "./lib.es2022.sharedmemory";
import es2022_string from "./lib.es2022.string";
import es5 from "./lib.es5";
import esnext from "./lib.esnext";
import esnext_intl from "./lib.esnext.intl";
import esnext_promise from "./lib.esnext.promise";
import esnext_string from "./lib.esnext.string";
import esnext_weakref from "./lib.esnext.weakref";

/**
 * To update the files when a new TypeScript version has been released:
 *
 * In temporary folder:
 * 1. `git clone https://github.com/dsherret/ts-ast-viewer/`
 * 2. `cd ts-ast-viewer`
 * 3. `yarn`
 * 4. `yarn addTypeScriptVersions`
 * 5. `yarn updateCompilerFiles`
 * 6. Copy files from `site/src/resources/libFiles/[TS_VERSION]
 * 7. Update in this folder & index
 *
 * For the most recent typescript version.
 *
 * The following libs are deleted to reduce the extension size:
 * - DOM-related files (incl. webworker)
 * - TS specific files
 * - ES NEext
 * - .full files
 *
 * P42 uses the latest ES version with TS39 Stage 4 proposals (currently ES2021).
 */
const tsLibFiles: Array<SourceFileContent> = [
  es5,
  es2015_collection,
  es2015_core,
  es2015_generator,
  es2015_iterable,
  es2015_promise,
  es2015_proxy,
  es2015_reflect,
  es2015_symbol,
  es2015_symbol_wellknown,
  es2015,
  es2016_array_include,
  es2016,
  es2017_intl,
  es2017_object,
  es2017_sharedmemory,
  es2017_string,
  es2017_typedarrays,
  es2017,
  es2018_asyncgenerator,
  es2018_asynciterable,
  es2018_intl,
  es2018_promise,
  es2018_regexp,
  es2018,
  es2019_array,
  es2019_intl,
  es2019_object,
  es2019_string,
  es2019_symbol,
  es2019,
  es2020_bigint,
  es2020_date,
  es2020_intl,
  es2020_number,
  es2020_promise,
  es2020_sharedmemory,
  es2020_string,
  es2020_symbol_wellknown,
  es2020,
  es2021_intl,
  es2021_promise,
  es2021_string,
  es2021_weakref,
  es2021,
  es2022_array,
  es2022_error,
  es2022_intl,
  es2022_object,
  es2022_string,
  es2022_sharedmemory,
  es2022,
  esnext,
  esnext_intl,
  esnext_promise,
  esnext_string,
  esnext_weakref,
].map((value) => ({
  path: value.fileName,
  content: value.text,
  extension: "ts",
}));

export class DefaultLibCompilerHost extends SourceFileCompilerHost {
  constructor() {
    super(tsLibFiles, undefined);
  }

  getDefaultLibFileName(options: ts.CompilerOptions): string {
    switch (options.target) {
      case ts.ScriptTarget.ES3: // TODO unclear what to use for ES3
        throw "ES3 is not supported";
      case ts.ScriptTarget.ESNext:
        return "/lib.esnext.d.ts";
      case ts.ScriptTarget.ES2022:
        return "/lib.es2022.d.ts";
      case ts.ScriptTarget.ES2021:
        return "/lib.es2021.d.ts";
      case ts.ScriptTarget.ES2020:
        return "/lib.es2020.d.ts";
      case ts.ScriptTarget.ES2019:
        return "/lib.es2019.d.ts";
      case ts.ScriptTarget.ES2018:
        return "/lib.es2018.d.ts";
      case ts.ScriptTarget.ES2017:
        return "/lib.es2017.d.ts";
      case ts.ScriptTarget.ES2016:
        return "/lib.es2016.d.ts";
      case ts.ScriptTarget.ES2015:
        return "/lib.es2015.d.ts";
      case ts.ScriptTarget.ES5:
      default:
        return "/lib.es5.d.ts"; // default to ES5
    }
  }
}
