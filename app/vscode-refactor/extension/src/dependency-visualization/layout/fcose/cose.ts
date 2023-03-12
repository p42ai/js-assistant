/**
  The implementation of the postprocessing part that applies CoSE layout over the spectral layout
*/

import * as coseBase from "cose-base";
import * as aux from "./auxiliary";

const CoSELayout = coseBase.CoSELayout;
const CoSENode = coseBase.CoSENode;
const PointD = coseBase.layoutBase.PointD;
const DimensionD = coseBase.layoutBase.DimensionD;
const LayoutConstants = coseBase.layoutBase.LayoutConstants;
const FDLayoutConstants = coseBase.layoutBase.FDLayoutConstants;
const CoSEConstants = coseBase.CoSEConstants;

// main function that cose layout is processed
export function coseLayout(
  options: coseBase.CoseOptions,
  spectralResult: {
    nodeIndexes: {
      get(id: string): number;
    };
    xCoords: number[];
    yCoords: number[];
  }
) {
  let eles = options.eles;
  let nodes = eles.nodes();
  let edges = eles.edges();

  let nodeIndexes: {
    get(id: string): number;
  };
  let xCoords: number[];
  let yCoords: number[];
  let idToLNode: Record<string, coseBase.CYNode> = {};

  if (options.randomize) {
    nodeIndexes = spectralResult.nodeIndexes;
    xCoords = spectralResult.xCoords;
    yCoords = spectralResult.yCoords;
  }

  const isFn = (fn: any) => typeof fn === "function";

  const optFn = (opt: any, ele: any) => (isFn(opt) ? opt(ele) : opt);

  /**** Postprocessing functions ****/

  // transfer cytoscape nodes to cose nodes
  let processChildrenList = function (
    this: any,
    parent: coseBase.CoSENode,
    children: coseBase.CYNodeList,
    layout: coseBase.CoSELayout,
    options: coseBase.CoseOptions
  ) {
    let size = children.length;
    for (let i = 0; i < size; i++) {
      let theChild = children[i];
      let children_of_children = theChild.children();
      let theNode: coseBase.CoSENode | undefined;

      let dimensions = theChild.layoutDimensions({
        nodeDimensionsIncludeLabels: options.nodeDimensionsIncludeLabels,
      });

      if (theChild.outerWidth() != null && theChild.outerHeight() != null) {
        if (options.randomize) {
          if (!theChild.isParent()) {
            theNode = parent.add(
              new CoSENode(
                layout.graphManager,
                new PointD(
                  xCoords[nodeIndexes.get(theChild.id())] - dimensions.w / 2,
                  yCoords[nodeIndexes.get(theChild.id())] - dimensions.h / 2
                ),
                new DimensionD(
                  parseFloat(dimensions.w),
                  parseFloat(dimensions.h)
                )
              )
            );
          } else {
            let parentInfo = aux.calcBoundingBox(
              theChild,
              xCoords,
              yCoords,
              nodeIndexes
            );
            theNode = parent.add(
              new CoSENode(
                layout.graphManager,
                new PointD(parentInfo.topLeftX, parentInfo.topLeftY),
                new DimensionD(parentInfo.width, parentInfo.height)
              )
            );
          }
        } else {
          theNode = parent.add(
            new CoSENode(
              layout.graphManager,
              new PointD(
                theChild.position("x") - dimensions.w / 2,
                theChild.position("y") - dimensions.h / 2
              ),
              new DimensionD(parseFloat(dimensions.w), parseFloat(dimensions.h))
            )
          );
        }
      } else {
        theNode = parent.add(new CoSENode(this.graphManager));
      }

      theNode = theNode!;

      // Attach id to the layout node and repulsion value
      theNode.id = theChild.data("id");
      theNode.nodeRepulsion = optFn(options.nodeRepulsion, theChild);
      // Attach the paddings of cy node to layout node
      theNode.paddingLeft = parseInt(theChild.css("padding"));
      theNode.paddingTop = parseInt(theChild.css("padding"));
      theNode.paddingRight = parseInt(theChild.css("padding"));
      theNode.paddingBottom = parseInt(theChild.css("padding"));

      //Attach the label properties to both compound and simple nodes if labels will be included in node dimensions
      //These properties will be used while updating bounds of compounds during iterations or tiling
      //and will be used for simple nodes while transferring final positions to cytoscape
      if (options.nodeDimensionsIncludeLabels) {
        theNode.labelWidth = theChild.boundingBox({
          includeLabels: true,
          includeNodes: false,
          includeOverlays: false,
        }).w;
        theNode.labelHeight = theChild.boundingBox({
          includeLabels: true,
          includeNodes: false,
          includeOverlays: false,
        }).h;
        theNode.labelPosVertical = theChild.css("text-valign");
        theNode.labelPosHorizontal = theChild.css("text-halign");
      }

      // Map the layout node
      idToLNode[theChild.data("id")] = theNode as any; // TODO any

      if (isNaN(theNode.rect.x)) {
        theNode.rect.x = 0;
      }

      if (isNaN(theNode.rect.y)) {
        theNode.rect.y = 0;
      }

      if (children_of_children != null && children_of_children.length > 0) {
        let theNewGraph;
        theNewGraph = layout.getGraphManager().add(layout.newGraph(), theNode);
        processChildrenList(
          theNewGraph as any, // TODO any
          children_of_children,
          layout,
          options
        );
      }
    }
  };

  // transfer cytoscape edges to cose edges
  let processEdges = function (
    layout: coseBase.CoSELayout,
    gm: coseBase.GraphManager,
    edges: coseBase.CYEdge[]
  ) {
    let idealLengthTotal = 0;
    let edgeCount = 0;
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const sourceNode = idToLNode[edge.data("source")];
      const targetNode = idToLNode[edge.data("target")];

      if (
        sourceNode !== targetNode &&
        (sourceNode as any).getEdgesBetween(targetNode).length == 0 // TODO remove any
      ) {
        let e1 = gm.add(layout.newEdge(), sourceNode, targetNode);
        e1.id = edge.id();
        e1.idealLength = optFn(options.idealEdgeLength, edge);
        e1.edgeElasticity = optFn(options.edgeElasticity, edge);
        idealLengthTotal += e1.idealLength;
        edgeCount++;
      }
    }
    // we need to update the ideal edge length constant with the avg. ideal length value after processing edges
    // in case there is no edge, use other options
    if (options.idealEdgeLength != null) {
      if (edgeCount > 0)
        CoSEConstants.DEFAULT_EDGE_LENGTH =
          FDLayoutConstants.DEFAULT_EDGE_LENGTH = idealLengthTotal / edgeCount;
      else if (!isFn(options.idealEdgeLength))
        // in case there is no edge, but option gives a value to use
        CoSEConstants.DEFAULT_EDGE_LENGTH =
          FDLayoutConstants.DEFAULT_EDGE_LENGTH = options.idealEdgeLength;
      // in case there is no edge and we cannot get a value from option (because it's a function)
      else
        CoSEConstants.DEFAULT_EDGE_LENGTH =
          FDLayoutConstants.DEFAULT_EDGE_LENGTH = 50;
      // we need to update these constant values based on the ideal edge length constant
      CoSEConstants.MIN_REPULSION_DIST = FDLayoutConstants.MIN_REPULSION_DIST =
        FDLayoutConstants.DEFAULT_EDGE_LENGTH / 10.0;
      CoSEConstants.DEFAULT_RADIAL_SEPARATION =
        FDLayoutConstants.DEFAULT_EDGE_LENGTH;
    }
  };

  // transfer cytoscape constraints to cose layout
  let processConstraints = function (
    layout: coseBase.CoSELayout,
    options: coseBase.CoseOptions
  ) {
    // get nodes to be fixed
    if (options.fixedNodeConstraint) {
      layout.constraints["fixedNodeConstraint"] = options.fixedNodeConstraint;
    }
    // get nodes to be aligned
    if (options.alignmentConstraint) {
      layout.constraints["alignmentConstraint"] = options.alignmentConstraint;
    }
    // get nodes to be relatively placed
    if (options.relativePlacementConstraint) {
      layout.constraints["relativePlacementConstraint"] =
        options.relativePlacementConstraint;
    }
  };

  /**** Apply postprocessing ****/
  if (options.nestingFactor != null)
    CoSEConstants.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR =
      FDLayoutConstants.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR =
        options.nestingFactor;
  if (options.gravity != null)
    CoSEConstants.DEFAULT_GRAVITY_STRENGTH =
      FDLayoutConstants.DEFAULT_GRAVITY_STRENGTH = options.gravity;
  if (options.numIter != null)
    CoSEConstants.MAX_ITERATIONS = FDLayoutConstants.MAX_ITERATIONS =
      options.numIter;
  if (options.gravityRange != null)
    CoSEConstants.DEFAULT_GRAVITY_RANGE_FACTOR =
      FDLayoutConstants.DEFAULT_GRAVITY_RANGE_FACTOR = options.gravityRange;
  if (options.gravityCompound != null)
    CoSEConstants.DEFAULT_COMPOUND_GRAVITY_STRENGTH =
      FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_STRENGTH =
        options.gravityCompound;
  if (options.gravityRangeCompound != null)
    CoSEConstants.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR =
      FDLayoutConstants.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR =
        options.gravityRangeCompound;
  if (options.initialEnergyOnIncremental != null)
    CoSEConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL =
      FDLayoutConstants.DEFAULT_COOLING_FACTOR_INCREMENTAL =
        options.initialEnergyOnIncremental;

  if (options.quality == "proof") LayoutConstants.QUALITY = 2;
  else LayoutConstants.QUALITY = 0;

  CoSEConstants.NODE_DIMENSIONS_INCLUDE_LABELS =
    FDLayoutConstants.NODE_DIMENSIONS_INCLUDE_LABELS =
    LayoutConstants.NODE_DIMENSIONS_INCLUDE_LABELS =
      options.nodeDimensionsIncludeLabels;
  CoSEConstants.DEFAULT_INCREMENTAL =
    FDLayoutConstants.DEFAULT_INCREMENTAL =
    LayoutConstants.DEFAULT_INCREMENTAL =
      !options.randomize;
  CoSEConstants.ANIMATE =
    FDLayoutConstants.ANIMATE =
    LayoutConstants.ANIMATE =
      options.animate;
  CoSEConstants.TILE = options.tile;
  CoSEConstants.TILING_PADDING_VERTICAL =
    typeof options.tilingPaddingVertical === "function"
      ? options.tilingPaddingVertical.call()
      : options.tilingPaddingVertical;
  CoSEConstants.TILING_PADDING_HORIZONTAL =
    typeof options.tilingPaddingHorizontal === "function"
      ? options.tilingPaddingHorizontal.call()
      : options.tilingPaddingHorizontal;

  CoSEConstants.DEFAULT_INCREMENTAL =
    FDLayoutConstants.DEFAULT_INCREMENTAL =
    LayoutConstants.DEFAULT_INCREMENTAL =
      true;
  CoSEConstants.PURE_INCREMENTAL = !options.randomize;
  LayoutConstants.DEFAULT_UNIFORM_LEAF_NODE_SIZES =
    options.uniformNodeDimensions;

  // This part is for debug/demo purpose
  if (options.step == "transformed") {
    CoSEConstants.TRANSFORM_ON_CONSTRAINT_HANDLING = true;
    CoSEConstants.ENFORCE_CONSTRAINTS = false;
    CoSEConstants.APPLY_LAYOUT = false;
  }
  if (options.step == "enforced") {
    CoSEConstants.TRANSFORM_ON_CONSTRAINT_HANDLING = false;
    CoSEConstants.ENFORCE_CONSTRAINTS = true;
    CoSEConstants.APPLY_LAYOUT = false;
  }
  if (options.step == "cose") {
    CoSEConstants.TRANSFORM_ON_CONSTRAINT_HANDLING = false;
    CoSEConstants.ENFORCE_CONSTRAINTS = false;
    CoSEConstants.APPLY_LAYOUT = true;
  }
  if (options.step == "all") {
    CoSEConstants.TRANSFORM_ON_CONSTRAINT_HANDLING = options.randomize;
    CoSEConstants.ENFORCE_CONSTRAINTS = true;
    CoSEConstants.APPLY_LAYOUT = true;
  }

  CoSEConstants.TREE_REDUCTION_ON_INCREMENTAL =
    !options.fixedNodeConstraint &&
    !options.alignmentConstraint &&
    !options.relativePlacementConstraint;

  const coseLayout = new CoSELayout();
  let gm = coseLayout.newGraphManager();

  processChildrenList(
    gm.addRoot(),
    aux.getTopMostNodes(nodes),
    coseLayout,
    options
  );
  processEdges(coseLayout, gm, edges);
  processConstraints(coseLayout, options);

  coseLayout.runLayout();

  return idToLNode;
}
