/**
  The implementation of the spectral layout that is the first part of the fcose layout algorithm
*/

import * as aux from "./auxiliary";
import * as coseBase from "cose-base";

const Matrix = coseBase.layoutBase.Matrix;
const SVD = coseBase.layoutBase.SVD;

type Vector = coseBase.layoutBase.Vector;
type Matrix = coseBase.layoutBase.Matrix;

export type SpectralLayoutResult = {
  nodeIndexes: Map<any, any>;
  xCoords: number[];
  yCoords: number[];
};

const infinity = 100_000_000;
const small = 0.000000001;

// main function that spectral layout is processed
export function spectralLayout(
  options: coseBase.CoseOptions
): SpectralLayoutResult {
  const cy = options.cy;
  const eles = options.eles;
  const nodes = eles.nodes();
  const parentNodes = eles.nodes(":parent");

  const dummyNodes = new Map(); // map to keep dummy nodes and their neighbors
  const nodeIndexes = new Map(); // map to keep indexes to nodes
  const parentChildMap = new Map(); // mapping btw. compound and its representative node
  const allNodesNeighborhood: string[][] = []; // array to keep neighborhood of all nodes
  let xCoords: number[] = [];
  let yCoords: number[] = [];

  const samplesColumn: Vector = []; // sampled vertices
  const minDistancesColumn: Vector = [];
  const C: Matrix = []; // column sampling matrix
  const PHI: Matrix = []; // intersection of column and row sampling matrices
  let INV: Matrix = []; // inverse of PHI

  let firstSample; // the first sampled node
  let nodeSize: number;

  const piTol = options.piTol;
  const samplingType = options.samplingType; // false for random, true for greedy
  const nodeSeparation = options.nodeSeparation;
  let sampleSize: number;

  /**** Spectral-preprocessing functions ****/

  /**** Spectral layout functions ****/

  // determine which columns to be sampled
  const randomSampleCR = () => {
    let sample = 0;
    let count = 0;
    let flag = false;

    while (count < sampleSize) {
      sample = Math.floor(Math.random() * nodeSize);

      flag = false;
      for (let i = 0; i < count; i++) {
        if (samplesColumn[i] == sample) {
          flag = true;
          break;
        }
      }

      if (flag) {
        continue;
      } else {
        samplesColumn[count] = sample;
        count++;
      }
    }
  };

  // takes the index of the node(pivot) to initiate BFS as a parameter
  const BFS = (pivot: number, index: number, samplingMethod: boolean) => {
    const path = []; // the front of the path
    let front = 0; // the back of the path
    let back = 0;
    let current = 0;
    let temp;
    const distance = [];

    let max_dist = 0; // the furthest node to be returned
    let max_ind = 1;

    for (let i = 0; i < nodeSize; i++) {
      distance[i] = infinity;
    }

    path[back] = pivot;
    distance[pivot] = 0;

    while (back >= front) {
      current = path[front++];
      const neighbors = allNodesNeighborhood[current];
      for (const neighbor of neighbors) {
        temp = nodeIndexes.get(neighbor);
        if (distance[temp] == infinity) {
          distance[temp] = distance[current] + 1;
          path[++back] = temp;
        }
      }
      C[current][index] = distance[current] * nodeSeparation;
    }

    if (samplingMethod) {
      for (let i = 0; i < nodeSize; i++) {
        if (C[i][index] < minDistancesColumn[i])
          minDistancesColumn[i] = C[i][index];
      }

      for (let i = 0; i < nodeSize; i++) {
        if (minDistancesColumn[i] > max_dist) {
          max_dist = minDistancesColumn[i];
          max_ind = i;
        }
      }
    }
    return max_ind;
  };

  // apply BFS to all nodes or selected samples
  const allBFS = (samplingMethod: boolean) => {
    let sample;

    if (samplingMethod) {
      sample = Math.floor(Math.random() * nodeSize);
      firstSample = sample;

      for (let i = 0; i < nodeSize; i++) {
        minDistancesColumn[i] = infinity;
      }

      for (let i = 0; i < sampleSize; i++) {
        samplesColumn[i] = sample;
        sample = BFS(sample, i, samplingMethod);
      }
    } else {
      randomSampleCR();

      // call BFS
      for (let i = 0; i < sampleSize; i++) {
        BFS(samplesColumn[i], i, samplingMethod); // , false);
      }
    }

    // form the squared distances for C
    for (let i = 0; i < nodeSize; i++) {
      for (let j = 0; j < sampleSize; j++) {
        C[i][j] *= C[i][j];
      }
    }

    // form PHI
    for (let i = 0; i < sampleSize; i++) {
      PHI[i] = [];
    }

    for (let i = 0; i < sampleSize; i++) {
      for (let j = 0; j < sampleSize; j++) {
        PHI[i][j] = C[samplesColumn[j]][i];
      }
    }
  };

  // perform the SVD algorithm and apply a regularization step
  const sample = () => {
    const SVDResult = SVD.svd(PHI);

    const a_q = SVDResult.S;
    const a_u = SVDResult.U;
    const a_v = SVDResult.V;

    const max_s = a_q[0] * a_q[0] * a_q[0];

    const a_Sig: Matrix = [];

    //  regularization
    for (let i = 0; i < sampleSize; i++) {
      a_Sig[i] = [];
      for (let j = 0; j < sampleSize; j++) {
        a_Sig[i][j] = 0;
        if (i == j) {
          a_Sig[i][j] = a_q[i] / (a_q[i] * a_q[i] + max_s / (a_q[i] * a_q[i]));
        }
      }
    }

    INV = Matrix.multMat(Matrix.multMat(a_v, a_Sig), Matrix.transpose(a_u));
  };

  // calculate final coordinates
  const powerIteration = () => {
    // two largest eigenvalues
    let theta1: number;
    let theta2: number;

    // initial guesses for eigenvectors
    let Y1: Vector = [];
    let Y2: Vector = [];

    const V1: Vector = [];
    let V2: Vector = [];

    for (let i = 0; i < nodeSize; i++) {
      Y1[i] = Math.random();
      Y2[i] = Math.random();
    }

    Y1 = Matrix.normalize(Y1);
    Y2 = Matrix.normalize(Y2);

    let count = 0;
    // to keep track of the improvement ratio in power iteration
    let current = small;
    let previous = small;

    let temp;

    while (true) {
      count++;

      for (let i = 0; i < nodeSize; i++) {
        V1[i] = Y1[i];
      }

      Y1 = Matrix.multGamma(Matrix.multL(Matrix.multGamma(V1), C, INV));
      theta1 = Matrix.dotProduct(V1, Y1);
      Y1 = Matrix.normalize(Y1);

      current = Matrix.dotProduct(V1, Y1);

      temp = Math.abs(current / previous);

      if (temp <= 1 + piTol && temp >= 1) {
        break;
      }

      previous = current;
    }

    for (let i = 0; i < nodeSize; i++) {
      V1[i] = Y1[i];
    }

    count = 0;
    previous = small;
    while (true) {
      count++;

      for (let i = 0; i < nodeSize; i++) {
        V2[i] = Y2[i];
      }

      V2 = Matrix.minusOp(V2, Matrix.multCons(V1, Matrix.dotProduct(V1, V2)));
      Y2 = Matrix.multGamma(Matrix.multL(Matrix.multGamma(V2), C, INV));
      theta2 = Matrix.dotProduct(V2, Y2);
      Y2 = Matrix.normalize(Y2);

      current = Matrix.dotProduct(V2, Y2);

      temp = Math.abs(current / previous);

      if (temp <= 1 + piTol && temp >= 1) {
        break;
      }

      previous = current;
    }

    for (let i = 0; i < nodeSize; i++) {
      V2[i] = Y2[i];
    }

    // theta1 now contains dominant eigenvalue
    // theta2 now contains the second-largest eigenvalue
    // V1 now contains theta1's eigenvector
    // V2 now contains theta2's eigenvector

    //populate the two vectors
    xCoords = Matrix.multCons(V1, Math.sqrt(Math.abs(theta1)));
    yCoords = Matrix.multCons(V2, Math.sqrt(Math.abs(theta2)));
  };

  /**** Preparation for spectral layout (Preprocessing) ****/

  // connect disconnected components (first top level, then inside of each compound node)
  aux.connectComponents(cy, eles, aux.getTopMostNodes(nodes));

  parentNodes.forEach((ele) => {
    aux.connectComponents(
      cy,
      eles,
      aux.getTopMostNodes(ele.descendants().intersection(eles))
    );
  });

  // assign indexes to nodes (first real, then dummy nodes)
  let index = 0;
  for (const node of nodes) {
    if (!node.isParent()) {
      nodeIndexes.set(node.id(), index++);
    }
  }

  for (const key of dummyNodes.keys()) {
    nodeIndexes.set(key, index++);
  }

  // instantiate the neighborhood matrix
  for (let i = 0; i < nodeIndexes.size; i++) {
    allNodesNeighborhood[i] = [];
  }

  // form a parent-child map to keep representative node of each compound node
  parentNodes.forEach((ele) => {
    let children = ele.children().intersection(eles);

    //      let random = 0;
    while (children.nodes(":childless").length == 0) {
      //        random = Math.floor(Math.random() * children.nodes().length); // if all children are compound then proceed randomly
      children = children.nodes()[0].children().intersection(eles);
    }
    //  select the representative node - we can apply different methods here
    //      random = Math.floor(Math.random() * children.nodes(":childless").length);
    let index = 0;
    let min = children.nodes(":childless")[0].connectedEdges().length;
    children.nodes(":childless").forEach((ele2, i) => {
      if (ele2.connectedEdges().length < min) {
        min = ele2.connectedEdges().length;
        index = i;
      }
    });
    parentChildMap.set(ele.id(), children.nodes(":childless")[index].id());
  });

  // add neighborhood relations (first real, then dummy nodes)
  nodes.forEach((ele: coseBase.CYNode) => {
    const eleIndex: number = ele.isParent()
      ? nodeIndexes.get(parentChildMap.get(ele.id()))
      : nodeIndexes.get(ele.id());

    ele
      .neighborhood()
      .nodes()
      .forEach((node) => {
        // if (eles.intersection(ele.edgesWith(node)).length > 0) {
        if (node.isParent())
          allNodesNeighborhood[eleIndex].push(parentChildMap.get(node.id()));
        else allNodesNeighborhood[eleIndex].push(node.id());
        // }
      });
  });

  for (const key of dummyNodes.keys()) {
    const eleIndex = nodeIndexes.get(key);
    let disconnectedId;
    dummyNodes.get(key).forEach((id: string) => {
      disconnectedId = cy.getElementById(id).isParent()
        ? parentChildMap.get(id)
        : id;

      allNodesNeighborhood[eleIndex].push(disconnectedId);
      allNodesNeighborhood[nodeIndexes.get(disconnectedId)].push(key);
    });
  }

  // nodeSize now only considers the size of transformed graph
  nodeSize = nodeIndexes.size;

  // If number of nodes in transformed graph is 1 or 2, either SVD or powerIteration causes problem
  // So skip spectral and layout the graph with cose
  if (nodeSize > 2) {
    // if # of nodes in transformed graph is smaller than sample size,
    // then use # of nodes as sample size
    sampleSize = nodeSize < options.sampleSize ? nodeSize : options.sampleSize;

    // instantiates the partial matrices that will be used in spectral layout
    for (let i = 0; i < nodeSize; i++) {
      C[i] = [];
    }
    for (let i = 0; i < sampleSize; i++) {
      INV[i] = [];
    }

    /**** Apply spectral layout ****/

    if (options.quality == "draft" || options.step == "all") {
      allBFS(samplingType);
      sample();
      powerIteration();
    } else {
      nodeIndexes.forEach((value, key) => {
        xCoords.push(cy.getElementById(key).position("x"));
        yCoords.push(cy.getElementById(key).position("y"));
      });
    }

    return {
      nodeIndexes,
      xCoords,
      yCoords,
    };
  }

  const iterator = nodeIndexes.keys();
  const firstNode = cy.getElementById(iterator.next().value);
  const firstNodePos = firstNode.position();
  const firstNodeWidth = firstNode.outerWidth();
  xCoords.push(firstNodePos.x);
  yCoords.push(firstNodePos.y);
  if (nodeSize == 2) {
    const secondNode = cy.getElementById(iterator.next().value);
    const secondNodeWidth = secondNode.outerWidth();
    xCoords.push(
      firstNodePos.x +
        firstNodeWidth / 2 +
        secondNodeWidth / 2 +
        (options.idealEdgeLength as number)
    );
    yCoords.push(firstNodePos.y);
  }

  return {
    nodeIndexes,
    xCoords,
    yCoords,
  };
}
