import styled from "styled-components";
import React from "react";

export const Row = (props, { props: children }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 5rem;
  width: ${(props) => (props.width ? props.width + "rem" : "100%")};
  justify-content: ${(props) => (props.justify ? props.justify : "space-around")};
`;
