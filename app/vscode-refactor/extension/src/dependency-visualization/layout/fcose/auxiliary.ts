/*
 * Auxiliary functions
 */

import * as coseBase from "cose-base";

const LinkedList = coseBase.layoutBase.LinkedList;

// get the top most nodes
export function getTopMostNodes(
  nodes: coseBase.CYNodeList
): coseBase.CYNodeList {
  const nodesMap: Record<string, boolean> = {};

  for (const node of nodes) {
    nodesMap[node.id()] = true;
  }

  return nodes.filter((node, i) => {
    // if (typeof ele === "number") {
    //   ele = i;
    // }
    let parent = node.parent()[0];
    while (parent != null) {
      if (nodesMap[parent.id()]) {
        return false;
      }
      parent = parent.parent()[0];
    }
    return true;
  });
}

// find disconnected components and create dummy nodes that connect them
export function connectComponents(
  cy: coseBase.CY,
  nodes: coseBase.CYNodeList,
  topMostNodes: coseBase.CYNodeList
) {
  const queue = new LinkedList<coseBase.CYNode>();
  const visited = new Set<coseBase.CYNode>();
  let visitedTopMostNodes = [];
  let currentNeighbor: coseBase.CYNodeList;
  let minDegreeNode;
  let minDegree: number;

  let isConnected = false;
  let count = 1;
  const nodesConnectedToDummy = [];
  const components = [];

  do {
    const component = cy.collection();
    components.push(component);

    let currentNode = topMostNodes[0];

    const childrenOfCurrentNode = cy
      .collection()
      .merge(currentNode)
      .merge(currentNode.descendants().intersection(nodes));

    visitedTopMostNodes.push(currentNode);

    childrenOfCurrentNode.forEach((node: coseBase.CYNode) => {
      queue.push(node);
      visited.add(node);
      component.merge(node);
    });

    while (queue.length != 0) {
      currentNode = queue.shift();

      // Traverse all neighbors of this node
      const neighborNodes = cy.collection();

      currentNode
        .neighborhood()
        .nodes()
        .forEach((node: coseBase.CYNode) => {
          // if (nodes.intersection(currentNode.edgesWith(node)).length > 0) {
          neighborNodes.merge(node);
          // }
        });

      for (const neighborNode of neighborNodes) {
        currentNeighbor = topMostNodes.intersection(
          neighborNode.union(neighborNode.ancestors())
        );
        if (currentNeighbor != null && !visited.has(currentNeighbor[0])) {
          const childrenOfNeighbor = currentNeighbor.union(
            currentNeighbor.descendants()
          );

          childrenOfNeighbor.forEach((node: coseBase.CYNode) => {
            queue.push(node);
            visited.add(node);
            component.merge(node);
            if (topMostNodes.has(node)) {
              visitedTopMostNodes.push(node);
            }
          });
        }
      }
    }

    component.forEach((node: coseBase.CYNode) => {
      nodes
        .intersection(node.connectedEdges())
        .forEach((e: coseBase.CYEdge) => {
          // connectedEdges() usually cached
          if (component.has(e.source()) && component.has(e.target())) {
            // has() is cheap
            component.merge(e); // forEach() only considers nodes -- sets N at call time
          }
        });
    });

    if (visitedTopMostNodes.length === topMostNodes.length) {
      isConnected = true;
    }

    if (!isConnected || (isConnected && count > 1)) {
      minDegreeNode = visitedTopMostNodes[0];
      minDegree = minDegreeNode.connectedEdges().length;
      visitedTopMostNodes.forEach((node) => {
        if (node.connectedEdges().length < minDegree) {
          minDegree = node.connectedEdges().length;
          minDegreeNode = node;
        }
      });
      nodesConnectedToDummy.push(minDegreeNode.id());

      // TODO: Check efficiency of this part
      const temp = cy.collection();
      temp.merge(visitedTopMostNodes[0]);
      visitedTopMostNodes.forEach((node) => {
        temp.merge(node);
      });
      visitedTopMostNodes = [];
      topMostNodes = topMostNodes.difference(temp);
      count++;
    }
  } while (!isConnected);

  return components;
}

export function calcBoundingBox(
  parentNode: coseBase.CYNode,
  xCoords: number[],
  yCoords: number[],
  nodeIndexes: {
    get(id: string): number;
  }
) {
  // calculate bounds
  let left = Number.MAX_SAFE_INTEGER;
  let right = Number.MIN_SAFE_INTEGER;
  let top = Number.MAX_SAFE_INTEGER;
  let bottom = Number.MIN_SAFE_INTEGER;
  let nodeLeft;
  let nodeRight;
  let nodeTop;
  let nodeBottom;

  let nodes = parentNode.descendants().not(":parent");
  let s = nodes.length;
  for (let i = 0; i < s; i++) {
    const node = nodes[i];

    nodeLeft = xCoords[nodeIndexes.get(node.id())] - node.width() / 2;
    nodeRight = xCoords[nodeIndexes.get(node.id())] + node.width() / 2;
    nodeTop = yCoords[nodeIndexes.get(node.id())] - node.height() / 2;
    nodeBottom = yCoords[nodeIndexes.get(node.id())] + node.height() / 2;

    if (left > nodeLeft) {
      left = nodeLeft;
    }

    if (right < nodeRight) {
      right = nodeRight;
    }

    if (top > nodeTop) {
      top = nodeTop;
    }

    if (bottom < nodeBottom) {
      bottom = nodeBottom;
    }
  }

  return {
    topLeftX: left,
    topLeftY: top,
    width: right - left,
    height: bottom - top,
  };
}
