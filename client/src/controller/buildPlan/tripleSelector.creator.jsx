import * as factory from "model/factory";
import _ from "lodash";

import * as u from "model/utils";
import { store } from "index";
import { set, remove } from "model/redux/actions/actions";

export const createTripleSliders = (flow, text, selectedPeriod, stream) => {
  const state = store.getState();
  const { id, owner } = stream;
  const period = stream[selectedPeriod];

  const periods = +Object.keys(stream[flow]).pop();

  const optionArray = _.range(1, periods + 1).map((d) => u.asCurrency(stream[flow][d].value));

  const labelArray = _.range(1, periods + 1).map((d) => `${stream[flow][d].start} - ${stream[flow][d].end}`);

  const { birthYear } = state.user_reducer[owner];

  const editPeriod = {
    explanation: text.explanation,
    subTitle: text.subTitle,
    component: "TripleSliderSelector", //very special advanced component tailored for this type of object
    periods,
    chartName: text.chartName,
    chartType: text.chartType,
    getChartData: text.getChartData,
    valid: true,
    onUseEffect: text.onUseEffect,
    question: text.question,
    period,
    selectorProps: {
      title: text.explainer,
      optionArray,
      value: period,
      handleChange: (e) => set("stream_reducer", { [id]: { [`period${_.startCase(flow)}`]: e } }),
      addNew: () => factory.period(flow, id, stream),
      labelArray,
    },
  };

  const slidersArray = _.range(periods).map(() => {
    const startYear = stream[flow][period].start;
    const endYear = stream[flow][period].end;
    const { value } = stream[flow][period];

    const currentYear = new Date().getFullYear(); //the text needs to be able to refer to the income being earned in the past or in the future, so we will use this to test that

    const past = currentYear > startYear;

    return {
      component: "MultiSliders",
      num: 3,
      slider1: {
        bottomLabel: `at age ${startYear - +birthYear}`, //eg "at age 26"
        max: 2080,
        min: +birthYear + 18, //if its the first one then just 2020, otherwise its the period priors last year
        step: 1,
        topLabel: period === 1 ? "starting in" : "then in", //for the first one we want to say "starting in" but after they add changes we want it to say "then in"
        type: "year",
        value: startYear,
        handleChange: (value) => {
          if (text.setOptimumValues) text.setOptimumValues();
          set("stream_reducer", { [id]: { [flow]: { [period]: { start: value } } } });
        },
      },
      slider2: {
        bottomLabel: text.bottomLabel,
        max: text.max || 250000,
        min: 0,
        step: text.max < 25000 ? 100 : 1000,
        topLabel: past ? text.topLabelPast : text.topLabelFuture,
        value: value,
        handleChange: (value) => set("stream_reducer", { [id]: { [flow]: { [period]: { value: value } } } }),
      },
      slider3: {
        bottomLabel: `at age ${endYear - birthYear}`, //eg "at age 26"
        max: `${+birthYear + 110}`,
        min: startYear,
        step: 1,
        topLabel: "Until ",
        type: "year",
        value: endYear,
        handleChange: (value) => set("stream_reducer", { [id]: { [flow]: { [period]: { end: value } } } }),
      },
    };
  });

  return { ...editPeriod, slidersArray };
};
