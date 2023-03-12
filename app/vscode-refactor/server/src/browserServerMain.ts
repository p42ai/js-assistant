import {
  BrowserMessageReader,
  BrowserMessageWriter,
  createConnection,
} from "vscode-languageserver/browser";
import { setupServer } from "./setup/setupServer";

setupServer(
  createConnection(
    new BrowserMessageReader(self),
    new BrowserMessageWriter(self)
  )
);
