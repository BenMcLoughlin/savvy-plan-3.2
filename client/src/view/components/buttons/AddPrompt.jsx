import React from "react";
import styled from "styled-components";
import { AddButton } from "view/components/buttons/AddButton";

export const AddPrompt = ({ handleChange, label }) => {
  return (
    <Wrapper>
      <AddButton handleChange={handleChange} />
      <Div>{label}</Div>
    </Wrapper>
  );
};

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  display: flex;
  width: 25rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  position: relative;
  ${(props) => props.theme.neomorph};
  border-radius: 5px;
  padding: 1rem;
`;
const Div = styled.div`
  position: absolute;
  left: 4.3rem;
  font-size: 1.4rem;
`;
