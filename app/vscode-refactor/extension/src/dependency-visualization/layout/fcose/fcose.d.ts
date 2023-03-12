declare module "cose-base" {
  declare type CoseOptions = {
    eles: CYNodeList;
    randomize: boolean;
    nodeDimensionsIncludeLabels: boolean;
    nestingFactor?: number;
    numIter?: number;
    gravity?: number;
    gravityRange?: number;
    gravityCompound?: number;
    gravityRangeCompound?: number;
    step: "transformed" | "enforced" | "cose" | "all";
    fixedNodeConstraint?: boolean;
    initialEnergyOnIncremental?: number;

    idealEdgeLength: (() => number) | number;
    quality: "proof" | "default" | "draft";
    edgeElasticity?: number;
    animate: boolean;
    alignmentConstraint: {
      vertical?: number;
      horizontal?: number;
    };
    relativePlacementConstraint?: number;
    packComponents: boolean;
    tile: boolean;
    samplingType: boolean;
    sampleSize: number;

    cy: CY;
    piTol: number;
    nodeSeparation: number;

    randomize: boolean;
    nodeRepulsion: number;

    tilingPaddingVertical: any;
    tilingPaddingHorizontal: any;
    uniformNodeDimensions: any;
  };

  declare module layoutBase {
    declare class SVD {
      static svd(m: Matrix): {
        S: Vector;
        U: Matrix;
        V: Matrix;
      };
    }

    declare type Vector = Array<number>;

    declare type Matrix = Array<Vector>;

    declare module Matrix {
      function dotProduct(v: unknown, y: unknown): number;
      function normalize(v: Vector): Vector;
      function multCons(v: Vector, c: number): Vector;
      function minusOp(v: Vector, y: Vector): Vector;
      function transpose(m: Matrix): Matrix;
      function multMat(m: Matrix, y: Matrix): Matrix;
      function multGamma(v: Vector): Vector;
      function multL(v: Vector, m1: Matrix, m2: Matrix): Vector;
    }

    declare class LinkedList<T> {
      length: number;
      shift(): T;
      push(element: T): void;
    }

    declare class DimensionD {
      constructor(x: number, y: number): this;
    }

    declare class PointD {
      constructor(x: number, y: number): this;
    }

    declare class LayoutConstants {
      static ANIMATE: boolean;
      static DEFAULT_INCREMENTAL: boolean;
      static NODE_DIMENSIONS_INCLUDE_LABELS: boolean;
      static QUALITY: 2 | 0;
      static DEFAULT_UNIFORM_LEAF_NODE_SIZES: number;
    }

    declare class FDLayoutConstants {
      static ANIMATE: boolean;
      static DEFAULT_EDGE_LENGTH: any; // TODO any
      static DEFAULT_GRAVITY_STRENGTH: number;
      static DEFAULT_GRAVITY_RANGE_FACTOR: number;
      static DEFAULT_COMPOUND_GRAVITY_STRENGTH: number;
      static PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR: number;
      static MAX_ITERATIONS: number;
      static DEFAULT_INCREMENTAL: boolean;
      static NODE_DIMENSIONS_INCLUDE_LABELS: boolean;
      static DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR: number;
      static MIN_REPULSION_DIST: number;
      static DEFAULT_COOLING_FACTOR_INCREMENTAL: number;
    }
  }

  declare class CoSEConstants {
    static ANIMATE: boolean;
    static DEFAULT_EDGE_LENGTH: any; // TODO any
    static MIN_REPULSION_DIST: number;
    static DEFAULT_RADIAL_SEPARATION: number;
    static PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR: number;
    static DEFAULT_GRAVITY_RANGE_FACTOR: number;
    static DEFAULT_COOLING_FACTOR_INCREMENTAL: number;
    static DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR: number;
    static DEFAULT_COMPOUND_GRAVITY_STRENGTH: number;
    static TREE_REDUCTION_ON_INCREMENTAL: boolean;
    static MAX_ITERATIONS: number;
    static DEFAULT_GRAVITY_STRENGTH: number;
    static NODE_DIMENSIONS_INCLUDE_LABELS: boolean;
    static DEFAULT_INCREMENTAL: boolean;
    static PURE_INCREMENTAL: boolean;
    static TRANSFORM_ON_CONSTRAINT_HANDLING: boolean;
    static APPLY_LAYOUT: boolean;
    static TILING_PADDING_VERTICAL: number;
    static TILING_PADDING_HORIZONTAL: number;
    static ENFORCE_CONSTRAINTS: boolean;

    static TILE: unknown;
  }

  declare class CoSELayout {
    newGraphManager(): GraphManager;
    newGraph(): unknown;
    newEdge(): CoseEdge;

    getGraphManager(): GraphManager;

    runLayout(): void;

    constraints: Record<string, unknown>;
    graphManager: GraphManager;
  }

  declare type Position = {
    x: number;
    y: number;
  };

  declare type CY = {
    collection: () => coseBase.CYNodeList;
    getElementById: (id: string) => CYNode;
    layoutUtilities?: (value?: string) => unknown;
  };

  declare class CYNode {
    id(): string;
    width(): number;
    height(): number;
    neighborhood(): {
      nodes: () => CYNodeList;
    };
    position(): Position;
    position(type: string): number;
    outerWidth(): number;
    outerHeight(): number;

    layoutDimensions(arg: unknown);

    css(value: string);

    isParent(): boolean;
    parent(): CYNodeList;
    children(): CYNodeList;
    descendants(): CYNodeList;
    connectedEdges(): CYEdgeList;
    edgesWith(node: CYNode): CYEdgeList;
    ancestors(): CYNodeList;
    union(other: CYNodeList): CYNodeList;

    boundingbox(): {
      x1: number;
      y1: number;
      w: number;
      h: number;
    };

    boundingBox(x: {
      includeLabels: boolean;
      includeNodes: boolean;
      includeOverlays: boolean;
    });

    data(property: string): string;
  }

  declare class CYEdge {
    id(): string;
    source(): CYNode;
    target(): CYNode;
    data(property: string): string;
  }

  declare class CYNodeList extends Array<CYNode> {
    intersection(other: CYNodeList | CYNode[]): CYNodeList;
    intersection(other: CYEdgeList): CYEdgeList;

    difference(other: CYNodeList): CYNodeList;
    union(other: CYNodeList): CYNodeList;
    descendants(): CYNodeList;
    has(node: CYNode): boolean;
    not(specifier: string): CYNodeList;
    merge(node: CYNode | CYNodeList | CYEdge): CYNodeList;
    nodes(selector?: string): CYNodeList;
    edges(): CYEdgeList;

    filter(predicate: (node: CYNode, index: number) => boolean): CYNodeList;

    boundingBox(): {
      x1: number;
      y1: number;
      w: number;
      h: number;
    };
  }

  declare class CYEdgeList extends Array<CYEdge> {
    intersection(other: CYEdgeList): CYEdgeList;
  }

  declare class CoSENode {
    constructor(
      graphManager: GraphManager,
      point?: PointD,
      dimension?: DimensionD
    );

    add(node: CoSENode): CoSENode;

    getCenterX(): number;
    getCenterY(): number;
    setCenter(x: number, y: number): void;

    getLeft(): number;
    getTop(): number;
    getWidth(): number;
    getHeight(): number;

    getRect(): {
      getCenterX(): number;
      getCenterY(): number;
    };

    id: string;
    nodeRepulsion: number;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;

    labelWidth: number;
    labelHeight: number;
    labelPosVertical: "top" | "bottom";
    labelPosHorizontal: "left" | "right";

    rect: {
      x: number;
      y: number;
    };

    getEdgesBetween(target: CYNode): Array<unknown>;
  }

  declare class CoseEdge {
    id: string;
    idealLength: number;
    edgeElasticity: number;
  }

  declare class GraphManager {
    add(target: any, target1?: any, target3?: any): CoseEdge;
    addRoot(): CoSENode;
  }
}
