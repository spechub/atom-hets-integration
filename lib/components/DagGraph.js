"use babel";

import * as etch from "etch";
const $ = etch.dom;
import * as d3 from "d3";
import * as dagreD3 from "dagre-d3";

export class DagGraph {

  constructor(props) {
    this.props = props;

    this.scale = { k: 0.75, x: 0, y: 20 };

    this.displayGraph = this.displayGraph.bind(this);
    etch.initialize(this);
  }

  render() {
      return $.svg({ width: "300", height: "300", ref: "graphRenderTarget" });
  }

  update(props) {
    this.props = props;
    this.displayGraph();
    return etch.update(this);
  }

  displayGraph() {
    if (!this.props.graph || !this.refs.graphRenderTarget) {
      return;
    }

    const graph = this.props.graph;

    const svg = d3.select(this.refs.graphRenderTarget);
    svg.selectAll("g").remove();
    const g = svg.append("g");

    const zoom = d3.zoom().on("zoom", () => {
      g.attr("transform", d3.event.transform);
      this.scale = d3.event.transform;
    });
    svg.call(zoom);

    const render = new dagreD3.render();
    render(g, graph);

    const gWidth = (300 - graph.graph().width * this.scale.k) / 2;

    svg.call(
      zoom.transform,
      d3.zoomIdentity.translate(gWidth, this.scale.y).scale(this.scale.k)
    );
  }

  destroy () {
    etch.destroy(this);
  }
}
