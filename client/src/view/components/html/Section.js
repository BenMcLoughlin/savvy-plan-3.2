import styled from "styled-components";
import React from "react";

export const Section = (props) => {
  return <Wrapper {...props}>{props.children}</Wrapper>;
};

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  width: ${(props) => (props.width ? props.width + "rem" : "100%")};
  height: ${(props) => (props.height ? props.height + "rem" : "100%")};
  justify-content: ${(props) => (props.justify ? props.justify : "space-around")};
`;
