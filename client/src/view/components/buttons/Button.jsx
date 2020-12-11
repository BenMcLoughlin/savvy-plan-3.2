import React from "react";
import styled from "styled-components";

export const Button = ({ danger, label, handleChange, type = "button" }) => (
  <Wrapper type={type} onClick={() => handleChange()} danger={danger}>
    {label}
  </Wrapper>
);

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.button`
  height: 4.2rem;
  min-width: 14rem;
  max-width: 17rem;
  border-radius: 100px;
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
  color: ${(props) => props.theme.color.darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: ${(props) => props.theme.fontSize.small};
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in;
  text-transform: capitalize;
  ${(props) => props.theme.neomorph};
  background: ${(props) => (props.danger ? "#5e9090" : props.theme.color.background)};
`;
