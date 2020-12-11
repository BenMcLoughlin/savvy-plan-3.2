import * as d3 from "d3"
import { nestEggDonutHtml } from "view/charts/tooltips/nestEgg/html"

export const nestEgg = (allData, colors, chartName, graph, y, x) => {
  const tooltip = d3
    .select(`.${chartName}`)
    .append("div")
    .attr("class", `${chartName}tooltip`)
    .style("opacity", 1)
    .style("position", "absolute")
    .style("top", "10rem")
    .style("right", "30rem")

  d3.selectAll("path")
    .on("mouseover", (d, i, n) => {
      d3.select(n[i]).transition("changeSliceFill").duration(300).attr("opacity", 0.7)

      tooltip.html(() => nestEggDonutHtml(d))
      tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "none")
    })
    .on("mouseout", (d, i, n) => {
      d3.select(n[i]).transition("changeSliceFill").duration(300).attr("opacity", 1)
      tooltip.transition().duration(1500).style("opacity", 0)
    })
    .on("mousemove", () => {
      //tooltip
        // .style("top", d3.event.layerY - 10 + "px") // always 10px below the cursor
        // .style("left", d3.event.layerX + 35 + "px") // always 10px to the right of the mouse
    })
}
