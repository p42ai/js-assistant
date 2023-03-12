import * as vscode from "vscode";

export class DependencyGraphModule {
  constructor(
    readonly id: string,
    readonly label: string,
    readonly fileUri: vscode.Uri | undefined
  ) {}

  get type(): "external" | "source" {
    return this.fileUri == undefined ? "external" : "source";
  }
}

export class DependencyGraph {
  readonly basePath: string;

  // relative path without extension to module
  modules: Map<string, DependencyGraphModule> = new Map();

  readonly dependencies: Set<[string, string]> = new Set();

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  /**
   * Removes all external modules and their dependencies from the modules and
   * dependencies collections.
   */
  removeExternalModules() {
    this.modules.forEach((module, id) => {
      if (module.type === "external") {
        this.modules.delete(id);
      }
    });
    this.dependencies.forEach((dependency) => {
      if (
        !this.modules.has(dependency[0]) ||
        !this.modules.has(dependency[1])
      ) {
        this.dependencies.delete(dependency);
      }
    });
  }

  /**
   * Calculates the strongly connected components of a graph.
   *
   * @returns {Map<string, NodeData>} A map of node IDs to NodeData objects
   * containing the index, lowLink, onStack, and component properties.
   *
   * @see https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
   */
  calculateStronglyConnectedComponents() {
    type NodeData = {
      index?: number;
      lowLink?: number;
      onStack?: boolean;
      component: string[];
    };

    const nodeData: Map<string, NodeData> = new Map();
    for (const module of this.modules.values()) {
      nodeData.set(module.id, {
        index: undefined,
        lowLink: undefined,
        onStack: false,
        component: [],
      });
    }

    let index = 0;
    const stack: string[] = [];
    const strongConnect = (nodeId: string, data: NodeData) => {
      data.index = index;
      data.lowLink = index;

      index++;
      stack.push(nodeId);
      data.onStack = true;

      for (const dependency of this.dependencies) {
        if (dependency[0] === nodeId) {
          const dependencyNode = this.modules.get(dependency[1])!;
          const dependencyData = nodeData.get(dependencyNode.id)!;
          if (dependencyData.index == undefined) {
            strongConnect(dependencyNode.id, dependencyData);
            data.lowLink = Math.min(data.lowLink!, dependencyData.lowLink!);
          } else if (dependencyData.onStack) {
            data.lowLink = Math.min(data.lowLink!, dependencyData.index);
          }
        }
      }

      if (data.lowLink === data.index) {
        let dependencyNodeId: string | undefined;
        do {
          dependencyNodeId = stack.pop();
          const dependencyData = nodeData.get(dependencyNodeId!)!;
          dependencyData.onStack = false;
          data.component.push(dependencyNodeId!);
        } while (dependencyNodeId !== nodeId);
      }
    };

    for (const module of this.modules.values()) {
      const data = nodeData.get(module.id)!;
      if (data.index === undefined) {
        strongConnect(module.id, data);
      }
    }

    return nodeData;
  }

  addModule(fileUri: vscode.Uri, filePath: string, imports: string[]) {
    const fileExtensionIndex = filePath.lastIndexOf(".");
    const filePathWithoutExtension = filePath.substring(0, fileExtensionIndex);
    const prefixLength = this.basePath.length + 1;

    this.modules.set(
      filePathWithoutExtension,
      new DependencyGraphModule(
        filePathWithoutExtension,
        filePathWithoutExtension.substring(prefixLength),
        fileUri
      )
    );

    const lastIndex = filePath.lastIndexOf("/");
    const basePath = filePath.substring(0, lastIndex);

    for (const importName of imports) {
      const resolvedImport = resolveFullName(basePath, importName);

      this.dependencies.add([filePathWithoutExtension, resolvedImport]);

      if (!this.modules.has(resolvedImport)) {
        this.modules.set(
          resolvedImport,
          new DependencyGraphModule(resolvedImport, resolvedImport, undefined)
        );
      }
    }
  }
}

/**
 * Resolves a full name from a given name and an import name.
 *
 * @param {string} name - The given name.
 * @param {string} importName - The import name.
 *
 * @returns {string} The resolved full name.
 */
function resolveFullName(name: string, importName: string) {
  if (!importName.startsWith(".")) {
    return importName;
  }

  const parts = name.split("/");

  const importParts = importName.split("/");

  for (const importPart of importParts) {
    if (importPart === ".") {
      continue;
    }

    if (importPart === "..") {
      parts.pop();
      continue;
    }

    parts.push(importPart);
  }

  return parts.join("/");
}
