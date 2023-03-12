import { DependencyGraph } from "../DependencyGraph";

export type PositionedGraph = {
  modules: {
    id: string;
    label: string;
    position: {
      x: number;
      y: number;
    };
  }[];
  dependencies: {
    sourceId: string;
    targetId: string;
  }[];
};

export type layoutGraph = (graph: DependencyGraph) => PositionedGraph;
