import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as components from "view/components";
import { AssumptionsPanel, ProgressBar, Next, Back, Chart } from "view/components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useHistory, Redirect } from "react-router-dom";
import * as u from "model/utils";
import { store } from "index";
import { set } from "model/redux/actions/actions";

export const BuildPlan = ({ data }) => {
  const { progress } = store.getState().ui_reducer;
  const [direction, setDirection] = useState("forward");
  const { backButton, nextButton, buildPlan } = data;
  const { length } = buildPlan;
  const { explanation, backHandleChange, chartName, onNext, chartSize, onUseEffect } = data.buildPlan[progress];
  const history = useHistory();
  useEffect(() => {
    // saveStore()
    if (onUseEffect) {
      onUseEffect();
    }
    history.push(`/onboarding/${progress}`);
    window.addEventListener("popstate", () => {
      set("ui_reducer", { progress: +history.location.pathname.replace(/\D/g, "") });
    });
    // sendRequest(`http://localhost:5000/api/users/save`, "POST", JSON.stringify(state), {
    //   "Content-Type": "application/json",
    // })
  }, [progress, history]);

  if (progress === length - 2) return <Redirect to="/plan" />;

  return (
    <Wrapper>
      <ProgressBar length={length} progress={progress} />
      <AssumptionsPanel {...data.buildPlan[progress]} />
      <Text>
        {progress > 0 && explanation && <h3 style={{ fontWeight: "bold" }}>Why this matters</h3>}
        <h4>{explanation}</h4>
      </Text>
      <TransitionGroup>
        {buildPlan.map(
          (data, i) =>
            i === progress && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <Content>
                  <Header>
                    <H2 textLength={data.question.length}>{data.question}</H2>
                    <h3>{data.subTitle}</h3>
                  </Header>
                  <Component chart={chartName}>{u.matchThenShowComponent(components, data, data.component)}</Component>
                </Content>
              </CSSTransition>
            )
        )}
      </TransitionGroup>
      {progress > 0 && <Back {...backButton} setDirection={setDirection} backHandleChange={backHandleChange} />}
      {chartName && (
        <ChartWrapper chartSize={chartSize}>
          <Chart {...data.buildPlan[progress]} />
        </ChartWrapper>
      )}

      <Next {...nextButton} onNext={onNext} setDirection={setDirection} />
    </Wrapper>
  );
};

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  height: 100%rem;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  position: absolute;
  margin-top: 10rem;
  margin-left: -40rem;
  height: 40rem;
  width: 70rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Component = styled.div`
  position: absolute;
  margin-top: ${(props) => (props.chart === "IncomeChart" ? "77rem" : props.chart ? "94rem" : "30rem")};
  left: 0rem;
  width: 80rem;
  justify-content: center;
  display: flex;
  height: 40rem;
`;

const ChartWrapper = styled.div`
  position: absolute;
  top: ${(props) => (props.chartSize === "cover" ? "20rem" : "23rem")};
  left: ${(props) => (props.chartSize === "cover" ? "-10rem" : "32rem")};
  width: ${(props) => (props.chartSize === "cover" ? "135rem" : "80rem")};
  height: ${(props) => (props.chartSize === "cover" ? "45rem" : "30rem")};
  justify-content: center;
  display: flex;
`;
const Text = styled.div`
  height: 20rem;
  width: 20rem;
  display: flex;
  flex-wrap: flex-start;
  flex-direction: column;
  position: absolute;
  left: 10rem;
  top: 25rem;
`;

const Header = styled.div`
  position: absolute;
  top: -2rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  padding: 3rem;
`;

const H2 = styled.h2`
  margin-top: ${(p) => (p.textLength > 100 ? "-7rem" : "-4rem")};
  width: 80rem;
  line-height: 4.4rem;
`;
// const TransitionGroup = styled(TransitionGroup)`
//   height: 80rem;
//   width: 100rem;
//   background: grey;
// `
