/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { MultiSliders, Selector } from "view/components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { P } from "view/components/html";

export const TripleSliderSelector = ({ handleChange, handlePeriodChange, period, slidersArray, selectorProps }) => {
  const [direction, setDirection] = useState("forward");

  return (
    <Wrapper>
      <TransitionGroup>
        {slidersArray.map(
          (d, i) =>
            i + 1 === period && (
              <CSSTransition key={i} timeout={1000} classNames={`transition-${direction}`}>
                <Center>
                  <MultiSliders key={i} {...d} />
                </Center>
              </CSSTransition>
            )
        )}
      </TransitionGroup>
      <Change>
        <P fontSize={1.4} width={30}>
          {selectorProps.explainer}
        </P>
        <Selector {...selectorProps} />
      </Change>
    </Wrapper>
  );
};

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
  position: relative;
  height: 30rem;
  width: 40rem;
`;
const Center = styled.div`
  display: flex;
  width: 100%;
  height: 15rem;
  justify-content: center;
  position: absolute;
`;

const Change = styled.div`
  position: absolute;
  width: 30rem;
  height: 13rem;
  display: flex;
  top: 2rem;
  right: -42rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
