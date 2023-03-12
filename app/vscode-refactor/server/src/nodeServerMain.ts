import {
  createConnection,
  IPCMessageReader,
  IPCMessageWriter,
} from "vscode-languageserver/node";
import { setupServer } from "./setup/setupServer";

setupServer(
  createConnection(new IPCMessageReader(process), new IPCMessageWriter(process))
);
