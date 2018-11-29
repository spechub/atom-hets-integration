"use babel";

import * as d3 from "d3";
import * as dagreD3 from "dagre-d3";

import { DagGraph } from "./components/DagGraph";

export default class AtomHetsIntegrationView {
  constructor() {
    // Create root element
    this.element = document.createElement("div");
    this.element.classList.add("atom-hets-integration");

    // Create message element
    const message = document.createElement("div");
    message.classList.add("message");
    this.element.appendChild(message);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width","300");
    svg.setAttribute("height","300");
    this.element.appendChild(svg);

    const g = new dagreD3.graphlib.Graph({ multigraph: true })
    .setGraph({})
    .setDefaultEdgeLabel(() => {
      return {};
    });

    g.setNode("a", {
      label: "fouiaeuiaeuieuieao",
      shape: "ellipse",
      style: "fill: white; stroke: white;"
    });
    g.setNode("b", {
      label: "bar",
      shape: "ellipse",
      style: "fill: white; stroke: white;"
    });
    g.setNode("c", {
      label: "baz",
      shape: "ellipse",
      style: "fill: white; stroke: white;"
    });

    g.setEdge("a", "b", {
      style: "stroke: white; fill: none; stroke-width: 2px;",
      arrowheadStyle: "stroke: white; fill: white;",
      curve: d3.curveBasis
    });
    g.setEdge("b", "c", {
      style: "stroke: white; fill: none; stroke-width: 2px;",
      arrowheadStyle: "stroke: white; fill: white;",
      curve: d3.curveBasis
    });
    g.setEdge("c", "a", {
      style: "stroke: white; fill: none; stroke-width: 2px;",
      arrowheadStyle: "stroke: white; fill: white;",
      curve: d3.curveBasis
    });

    const graph = new DagGraph(svg, g);
    graph.displayGraph()



    // this.subscriptions = atom.workspace
    //   .getCenter()
    //   .observeActivePaneItem(item => {
    //     if (!atom.workspace.isTextEditor(item)) {
    //       message.innerText = "Please open a file.";
    //       return;
    //     }
    //     message.innerHTML = `${item.buffer.file.path}`;
    //   });
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      // This is used to look up the deserializer function. It can be any string, but it needs to be
      // unique across all packages!
      deserializer: "atom-hets-integration/AtomHetsIntegrationView"
    };
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
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
