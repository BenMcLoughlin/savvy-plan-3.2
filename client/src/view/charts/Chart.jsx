/* eslint-disable */
import React, { useRef, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import * as draw from "view/charts/drawCharts/index";
import * as u from "model/utils";
import { chartColors } from "view/styles/colors";
import * as cards from "view/charts/cards";

export const Chart = ({ chartName, chartType, state, set, user, getChartData, chartSize, card }) => {
  const { selectedUser } = state.ui_reducer;
  const { user_reducer, stream_reducer, ui_reducer } = state;

  const [width, setWith] = useState(500);
  const [height, setHeight] = useState(500);

  user = user ? user : "user1";
  const inputRef = useRef(null);
  const className = `${chartName}`;

  const allData = useMemo(() => u.trackFnDuration(getChartData, state, user), [stream_reducer, user_reducer, ui_reducer]);

  const colors = () => {
    const object = {};
    Object.assign(object, ...Object.values(stream_reducer).map((d) => ({ [d.name]: d.color })));
    return { ...object, ...chartColors };
  };

  const size = u.useWindowResize();

  useEffect(() => {
    if (inputRef && inputRef.current) {
      setWith(inputRef.current.offsetWidth);
      setHeight(inputRef.current.offsetHeight);
      draw[chartType](colors(), className, allData, height, state, width);
    }
  }, [allData, set, selectedUser, state, size]);

  return (
    <>
      <Wrapper chartSize={chartSize} chartType={chartType}>
        <Canvas className={className} ref={inputRef} />
        {/* {enableNav && (
        <ChartNavWrapper>
          <ChartNav options={["before tax", "after tax"]} handleChange={value => set("selectedAccount", "ui_reducer", value)} value={state.ui_reducer.selectedAccount} />
        </ChartNavWrapper>
      )} */}
      </Wrapper>
      {card && u.matchThenShowComponent(cards, null, card)}
    </>
  );
};

//---------------------------STYLES-------------------------------------------//

//${props => props.className === 'savings' ? "50rem" : '23rem'};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: ${(props) => (props.chartType === "donut" ? "42rem" : "100%")};
  width: ${(props) => (props.chartType === "donut" ? "42rem" : "100%")};
  margin-left: ${(props) => (props.chartType === "donut" ? "-30rem" : "0rem")};
  border-radius: 15px;
  ${(props) => (props.chartSize !== "cover" ? props.theme.neomorph : null)};
`;
const Canvas = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ChartNavWrapper = styled.div`
  position: absolute;
  top: 0rem;
  left: 4rem;
`;
