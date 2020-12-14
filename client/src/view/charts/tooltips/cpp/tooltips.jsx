import * as d3 from "d3";
import { cppCenterTooltipHtml, axisHtml } from "view/charts/tooltips/cpp/html";
import * as svg from "view/charts/tooltips/svgs/index";
import * as u from "model/utils";

export const cpp = (allData, colors, chartName, graph, y, x, height, width) => {
  //export const cpp = (chartName, data, graph, height, allData, y, x, width) => {
  const { chartData: data, state, user } = allData;

  const { firstName, cppPayment, cppStartAge, oasStartAge } = state.user_reducer[user] || { firstname: "ben", cppStartAge: 65 };

  const selectedAge = chartName.slice(0, 3) === "cpp" ? cppStartAge : oasStartAge;

  const d = data.filter((income) => income.year === selectedAge)[0];

  const tooltip1 = d3
    .select(`.${chartName}`)
    .append("div")
    .attr("class", `${chartName}tooltip`)
    .style("opacity", 1)
    .style("position", "absolute")
    .style("top", y(d.value) - `${height * 0.2}` + "px")
    .style("left", x(selectedAge)  + "px")
    .html(() => cppCenterTooltipHtml(allData, selectedAge));

  svg.addCircle(graph, x(selectedAge), y(d.value));

  svg.addText(graph, -40 + "px", y(6000) + "px", `${u.asCurrency(data[0].value)}`);
  svg.addText(graph, -40 + "px", y(8000) + "px", `Age ${data[0].year}`);
  svg.addText(graph, x(70) + 15 + "px", y(12000) + "px", `${u.asCurrency(data[data.length - 1].value)}`);
  svg.addText(graph, x(70) + 15 + "px", y(14000) + "px", `Age ${data[data.length - 1].year}`);
};
