import { DependencyGraph } from "../DependencyGraph";
import { spectralLayout } from "./fcose/spectral";
import { PositionedGraph } from "./layoutGraph";

class Graph {
  #nodes: NodeList = new NodeList();
  #nodesByID: Map<string, Node> = new Map();
  #edges: Array<[string, string]> = [];

  createNode(id: string) {
    const node = new Node(this, id);
    this.#nodes.push(node);
    this.#nodesByID.set(id, node);
    return node;
  }

  createEdge(sourceId: string, targetId: string) {
    this.#edges.push([sourceId, targetId]);
  }

  getNodes() {
    return this.#nodes;
  }

  getNodeById(id: string) {
    return this.#nodesByID.get(id);
  }

  getNodeNeighborhood(node: Node) {
    const nodeId = node.id();
    const nodeEdges = this.#edges.filter(
      ([sourceId, targetId]) => sourceId === nodeId || targetId === nodeId
    );
    const connectedNodes = nodeEdges
      .map(([sourceId, targetId]) => {
        const otherNodeId = sourceId === nodeId ? targetId : sourceId;
        return this.#nodesByID.get(otherNodeId);
      })
      .filter((node): node is Node => node !== undefined);

    const connectNodesList = new NodeList();
    connectedNodes.forEach((node) => connectNodesList.push(node));

    return {
      nodes() {
        return connectNodesList;
      },
    };
  }
}

class Edge {}

class Node {
  #graph: Graph;
  #id: string;

  constructor(graph: Graph, id: string) {
    this.#graph = graph;
    this.#id = id;
  }

  id() {
    return this.#id;
  }

  descendants() {
    return new NodeList();
  }

  connectedEdges() {
    return [];
  }

  neighborhood() {
    return this.#graph.getNodeNeighborhood(this);
  }

  ancestors() {
    return [];
  }

  parent() {
    return [];
  }

  isParent() {
    return false;
  }

  position(type: "x" | "y") {
    return 5; // TODO
  }

  union(other: NodeList): NodeList {
    const union = new NodeList();
    union.merge(this);
    union.merge(other);
    return union;
  }
}

class NodeList extends Array<Node> {
  merge(param: Node | NodeList) {
    if (param instanceof NodeList) {
      for (const node of param) {
        this.push(node);
      }
    } else {
      this.push(param);
    }

    return this; // TODO immutable, need to return copy??
  }

  filter(
    predicate: (value: Node, index: number, nodes: Array<Node>) => any,
    thisArg?: any
  ): NodeList {
    const newList = new NodeList();
    super.filter(predicate, thisArg).forEach((node) => newList.push(node));
    return newList;
  }

  nodes(selector?: string) {
    if (selector != null) {
      return new NodeList();
    }

    return this;
  }

  has(node: Node) {
    return this.includes(node);
  }

  // TODO more efficient algorithm
  difference(other: NodeList) {
    const differences = new NodeList();
    for (const node of this) {
      if (!other.includes(node)) {
        differences.push(node);
      }
    }
    return differences;
  }

  intersection(other: NodeList) {
    return this.filter((node) => other.includes(node));
  }

  union(other: NodeList): NodeList {
    const union = new NodeList();
    union.merge(this);
    union.merge(other);
    return union;
  }

  descendants() {
    return new NodeList();
  }
}

export function layoutWithSpectral(
  dependencies: DependencyGraph
): PositionedGraph {
  // TODO call intro spectral layout

  const graph = new Graph();

  dependencies.modules.forEach((module) => {
    graph.createNode(module.id);
  });

  dependencies.dependencies.forEach((dependency) => {
    graph.createEdge(dependency[0], dependency[1]);
  });

  const { nodeIndexes, xCoords, yCoords } = spectralLayout({
    cy: {
      collection() {
        return new NodeList();
      },
      getElementById(id: string) {
        return graph.getNodeById(id);
      },
    },
    eles: graph.getNodes(),
    piTol: 1,
    samplingType: false,
    nodeSeparation: 600,
    quality: "draft",
    sampleSize: 50,
  } as any);

  console.log({ nodeIndexes, xCoords, yCoords });

  const prefixLength = dependencies.basePath.length + 1;

  const modules = Array.from(dependencies.modules).map((module) => {
    const index = nodeIndexes.get(module);
    const label = module[0].substring(prefixLength) ?? "";
    return {
      id: label,
      label,
      position: { x: xCoords[index], y: yCoords[index] },
    };
  });

  const result = {
    modules,
    dependencies: Array.from(dependencies.dependencies.values()).map(
      ([sourcePath, targetPath]) => ({
        sourceId: sourcePath.substring(prefixLength),
        targetId: targetPath.substring(prefixLength),
      })
    ),
  };

  console.log(result);
  return result;
}
