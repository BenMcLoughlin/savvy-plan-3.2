import React from "react";
import styled from "styled-components";
import { ArrowLeftS } from "@styled-icons/remix-line";

export const Back = ({ backHandleChange, setDirection, handleChange }) => {
  return (
    <ArrowLeft
      onClick={() => {
        if (setDirection) {
          setDirection("back");
        }
        if (backHandleChange) backHandleChange();
        handleChange();
      }}
    />
  );
};

//---------------------------STYLES-------------------------------------------//

const ArrowLeft = styled(ArrowLeftS)`
  height: 4.2rem;
  width: 4.2rem;
  color: #c8c7c7;
  cursor: pointer;
  position: absolute;
  top: 12rem;
  left: 8%;
`;
