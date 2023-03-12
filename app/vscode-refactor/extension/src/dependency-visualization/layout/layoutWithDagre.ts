import * as dagre from "dagre";
import { DependencyGraph } from "../DependencyGraph";

export function layoutWithDagre(graph: DependencyGraph) {
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setGraph({
    rankdir: "LR",
    ranksep: 20,
  });

  dagreGraph.setDefaultEdgeLabel(() => ({}));

  graph.modules.forEach((module) => {
    dagreGraph.setNode(module.id, {
      label: module.label,
      width: module.id.length * 10,
      height: 50,
    });
  });

  graph.dependencies.forEach(([from, to]) => {
    dagreGraph.setEdge(from, to);
  });

  dagre.layout(dagreGraph);

  const prefixLength = graph.basePath.length + 1;

  const modules = dagreGraph.nodes().map((nodeId) => {
    const node = dagreGraph.node(nodeId);
    return {
      id: node.label ?? "", // TODO
      label: node.label ?? "",
      position: { x: node.x, y: node.y },
    };
  });

  const dependencies = Array.from(graph.dependencies.values()).map(
    ([sourcePath, targetPath]) => ({
      sourceId: sourcePath.substring(prefixLength),
      targetId: targetPath.substring(prefixLength),
    })
  );

  return {
    modules,
    dependencies,
  };
}
