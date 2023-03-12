import {
  BaseLanguageClient,
  LanguageClientOptions,
} from "vscode-languageclient";
import { Disposable } from "@p42/app-vscode-shared/build/util/Disposable";

export interface LanguageServerClient extends Disposable {
  // TODO getter with exception
  client: BaseLanguageClient | undefined;

  init(clientOptions: LanguageClientOptions): Promise<Disposable>;
}
