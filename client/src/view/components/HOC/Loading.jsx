import React from "react";
import styled, { keyframes } from "styled-components";

export const Loading = (props) => (
  <Wrapper>
    <Spinner i={1} />
    <Spinner i={2} />
    <Spinner i={3} />
  </Wrapper>
);

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  position: absolute;
  bottom: 10rem;
  left: 50rem;
  width: 30rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const beat = keyframes`
  50% {transform: scale(0.75);opacity: 0.2}
  100% {transform: scale(1);opacity: 1}
`;

const Spinner = styled.div`
  display: inline-block;
  background-color: ${(props) => props.theme.color.steelBlue};
  width: 1rem;
  height: 1rem;
  margin: 1rem;
  border-radius: 100%;
  animation: ${beat} 0.7s ${(props) => (props.i % 2 ? "0s" : "0.35s")} infinite linear;
  animation-fill-mode: both;
`;
