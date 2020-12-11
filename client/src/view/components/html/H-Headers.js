import styled from "styled-components";
import React from "react";

export const H1 = (props) => {
  return (
    <Wrapper H={1} {...props}>
      {props.children}
    </Wrapper>
  );
};
export const H2 = (props) => {
  return (
    <Wrapper H={2} {...props}>
      {props.children}
    </Wrapper>
  );
};
export const H3 = (props) => {
  return (
    <Wrapper H={3} {...props}>
      {props.children}
    </Wrapper>
  );
};
export const H4 = (props) => {
  return (
    <Wrapper H={4} {...props}>
      {props.children}
    </Wrapper>
  );
};

export const P1 = (props) => {
  return (
    <Wrapper H={1} {...props}>
      {props.children}
    </Wrapper>
  );
};
export const P2 = (props) => {
  return (
    <Wrapper H={2} {...props}>
      {props.children}
    </Wrapper>
  );
};

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  width: ${(props) => (props.width ? props.width + "rem" : "100%")};
  height: ${(props) => (props.height ? props.height + "rem" : "4rem")};
  font-size: ${(props) => (props.fontSize ? props.fontSize + "rem" : 4 / props.H + "rem")};
  justify-content: ${(props) => (props.justify ? props.justify : "space-around")};
  line-height: 2.5rem;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "bold")};
`;
