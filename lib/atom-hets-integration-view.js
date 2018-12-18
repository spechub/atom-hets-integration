"use babel";

import * as d3 from "d3";
import * as dagreD3 from "dagre-d3";

import { DagGraph } from "./components/DagGraph";

export default class AtomHetsIntegrationView {

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("atom-hets-integration");

    this.g = new dagreD3.graphlib.Graph({ multigraph: true })
    .setGraph({})
    .setDefaultEdgeLabel(() => {
      return {};
    });

    this.g.setNode("a", {
      label: "fouiaeuiaeuieuieao",
      shape: "ellipse",
      style: "fill: white; stroke: white;"
    });
    this.g.setNode("b", {
      label: "bar",
      shape: "ellipse",
      style: "fill: white; stroke: white;"
    });
    this.g.setNode("c", {
      label: "baz",
      shape: "ellipse",
      style: "fill: white; stroke: white;"
    });

    this.g.setEdge("a", "b", {
      style: "stroke: white; fill: none; stroke-width: 2px;",
      arrowheadStyle: "stroke: white; fill: white;",
      curve: d3.curveBasis
    });
    this.g.setEdge("b", "c", {
      style: "stroke: white; fill: none; stroke-width: 2px;",
      arrowheadStyle: "stroke: white; fill: white;",
      curve: d3.curveBasis
    });
    this.g.setEdge("c", "a", {
      style: "stroke: white; fill: none; stroke-width: 2px;",
      arrowheadStyle: "stroke: white; fill: white;",
      curve: d3.curveBasis
    });

    this.graph = new DagGraph({ graph: this.g });

    this.element.appendChild(this.graph.element);
  }

  showGraph() {
    setTimeout(() => {
      this.graph.update({ graph: this.g });
    }, 500);

    return this;
  }

  serialize() {
    return {
      deserializer: "atom-hets-integration/AtomHetsIntegrationView"
    };
  }

  destroy() {
    this.element.remove();
    this.graph.destroy();
  }

  getElement() {
    return this.element;
  }

  getTitle() {
    return "Development Graph";
  }

  getURI() {
    return "atom://atom-hets-integration-display-graph";
  }

  getDefaultLocation() {
    return "right";
  }

  getAllowedLocations() {
    return ["left", "right", "bottom"];
  }
}
