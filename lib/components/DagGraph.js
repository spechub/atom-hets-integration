"use babel";

import * as d3 from "d3";
import * as dagreD3 from "dagre-d3";

export class DagGraph {

  constructor(svg, graph) {
    this.baseSvg = svg;
    this.graph = graph;

    this.scale = { k: 0.75, x: 0, y: 20 };

    this.displayGraph = this.displayGraph.bind(this);
  }

  displayGraph() {
    if (!this.graph) {
      return;
    }

    const svg = d3.select(this.baseSvg);
    svg.selectAll("g").remove();
    const g = svg.append("g");

    const zoom = d3.zoom().on("zoom", () => {
      g.attr("transform", d3.event.transform);
      this.scale = d3.event.transform;
    });
    svg.call(zoom);

    const graph = this.graph;

    const render = new dagreD3.render();
    render(g, graph);

    const gWidth = (300 - graph.graph().width * this.scale.k) / 2;

    svg.call(
      zoom.transform,
      d3.zoomIdentity.translate(gWidth, this.scale.y).scale(this.scale.k)
    );
  }
}
