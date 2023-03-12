## Input
```javascript input
/*
 * Copyright P42 Software UG (haftungsbeschränkt). All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import {
  Connection,
  InitializeParams,
  InitializeResult,
  RequestType,
  ServerCapabilities,
  TextDocuments,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { BasicCapabilityManager } from "../shared/license/BasicCapabilityManager";
import { CapabilityConfiguration } from "../shared/license/Capability";

export const setCapabilitiesRequestType = new RequestType<
  CapabilityConfiguration,
  void,
  void
>("p42/set-capabilities");

export const setupServer = (connection: Connection) => {
  connection.onInitialize((params: InitializeParams): InitializeResult => {
    const capabilities: ServerCapabilities = {};
    return { capabilities };
  });

  const documents = new TextDocuments(TextDocument);
  documents.listen(connection);

  const capabilityManager = new BasicCapabilityManager();

  capabilityManager.onCapabilitiesChanged(async () => {
    console.log(
      "capabilities changed",
      await capabilityManager.getCapabilities()
    );
  });

  connection.onRequest(
    setCapabilitiesRequestType,
    async (capabilities) => void capabilityManager.setCapabilities(capabilities)
  );

  connection.listen();
};
```

## Configuration
```json configuration
{
  "extension": "ts",
  "selection": "575-575"
}
```

## Expected Output
```javascript expected output
/*
 * Copyright P42 Software UG (haftungsbeschränkt). All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import {
  Connection,
  InitializeParams,
  InitializeResult,
  RequestType,
  ServerCapabilities,
  TextDocuments,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { BasicCapabilityManager } from "../shared/license/BasicCapabilityManager";
import { CapabilityConfiguration } from "../shared/license/Capability";

export const setupServer = (connection: Connection) => {
  connection.onInitialize((params: InitializeParams): InitializeResult => {
    const capabilities: ServerCapabilities = {};
    return { capabilities };
  });

  const documents = new TextDocuments(TextDocument);
  documents.listen(connection);

  const capabilityManager = new BasicCapabilityManager();

  capabilityManager.onCapabilitiesChanged(async () => {
    console.log(
      "capabilities changed",
      await capabilityManager.getCapabilities()
    );
  });

  connection.onRequest(
    new RequestType<
      CapabilityConfiguration,
      void,
      void
    >("p42/set-capabilities"),
    async (capabilities) => void capabilityManager.setCapabilities(capabilities)
  );

  connection.listen();
};
```
