import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MarkerType,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { vscodeApi } from "../../vscode/VsCodeApi";

export const DependencyVisualizationView: React.FC<{
  data:
    | {
        graph: {
          modules: Array<{
            id: string;
            label: string;
            position: {
              x: number;
              y: number;
            };
          }>;
          dependencies: Array<{
            sourceId: string;
            targetId: string;
          }>;
        };
        stronglyConnectedComponents: Array<Array<string>>;
      }
    | undefined;
}> = ({ data }) => {
  if (data == null) {
    return <></>; // not initialized
  }

  const { graph, stronglyConnectedComponents } = data;

  const nodesInStronglyConnectedComponents = stronglyConnectedComponents.flat();

  const initialNodes = graph.modules.map((module) => ({
    id: module.id,
    position: module.position,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    connectable: false,
    deletable: false,
    data: {
      label: module.label,
    },
    style: {
      width: 20 + module.label.length * 6.5,
      borderColor: nodesInStronglyConnectedComponents.includes(module.id)
        ? "var(--vscode-charts-orange)"
        : "var(--vscode-editor-foreground)",
      backgroundColor: "var(--vscode-editor-background)",
      color: "var(--vscode-editor-foreground)",
    },
  }));

  const initialEdges = graph.dependencies.map((dependency) => ({
    id: `${dependency.sourceId}-${dependency.targetId}`,
    source: dependency.sourceId,
    target: dependency.targetId,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 25,
      height: 25,
      color:
        nodesInStronglyConnectedComponents.includes(dependency.sourceId) &&
        nodesInStronglyConnectedComponents.includes(dependency.targetId)
          ? "orange" // TODO better orange / gray
          : "inherit",
    },
    style: {
      stroke:
        nodesInStronglyConnectedComponents.includes(dependency.sourceId) &&
        nodesInStronglyConnectedComponents.includes(dependency.targetId)
          ? "var(--vscode-charts-orange)"
          : undefined,
    },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      minZoom={0.1}
      maxZoom={2}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDoubleClick={(event, node) => {
        vscodeApi.postMessage({ type: "doubleClickNode", nodeId: node.id });
      }}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};
