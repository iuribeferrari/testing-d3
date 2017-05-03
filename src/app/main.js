import React, {Component} from 'react';
import axios from 'axios';

export class Main extends Component {

  componentDidMount() {

    axios
      .get('http://192.168.99.100:8000/')
      .then((response) => {
        const tree = {
          name: 'tree',
          children: response.data.verbs.filter(obj => obj.name.indexOf('vió') < 0)
        };

        const width = window.innerWidth-40;
        const height = window.innerHeight-40;
        const color = d3.scale.category10();
        const div = d3.select("#main").append("div").style("position", "relative");

        function position() {
          this.style("left", function(d) { return d.x + "px"; })
              .style("top", function(d) { return d.y + "px"; })
              .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
              .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
        }

        const treemap = d3.layout.treemap()
          .size([width, height])
          .sticky(true)
          .value(function(d) { return d.size; });

        const node = div.datum(tree).selectAll(".node")
          .data(treemap.nodes)
          .enter().append("div")
            .attr("class", "node")
            .call(position)
            .style("background-color", function(d) {
                return d.name == 'tree' ? '#fff' : color(d.name); })
            .append('div')
            .text(function(d) { return d.children ? null : d.name; });

      });
  }

  render() {
    return (
      <div id="main">
      </div>
    );
  }
}
