import React, { useEffect } from "react";
import styled from "styled-components";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import { CSSTransition } from "react-transition-group";
import { store } from "index";
import { set } from "model/redux/actions/actions";
import * as backend from "model/utils/backend";

export const Next = ({ handleChange, onNext, setDirection, valid }) => {
  const state = store.getState();

  useEffect(() => {
    const pressEnter = (event) => {
      if (event.key === "Enter") {
        handleChange(setDirection, valid);
        if (onNext) onNext();
      }
    };
    if (valid) {
      window.addEventListener("keydown", pressEnter);
      return () => window.removeEventListener("keydown", pressEnter);
    }
  }, [handleChange, onNext, setDirection, valid, state]);

  return (
    <Wrapper>
      <CSSTransition in={valid} mountOnEnter unmountOnExit timeout={700} classNames="fade-in">
        <Circle valid={valid}>
          <ArrowRight
            valid={valid}
            onClick={() => {
              setDirection("forward");
              backend.saveStore();
              handleChange(setDirection, valid);
              set("ui_reducer", { assumptionPanelOpen: false });
              if (onNext) onNext();
            }}
            id="nextButton"
          />
          <P>Press Enter</P>
        </Circle>
      </CSSTransition>
    </Wrapper>
  );
};

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
  position: absolute;
  top: 18rem;
  right: 4%;
`;

const Circle = styled.div`
  border-radius: 50%;
  background: ${(props) => props.theme.color.background};
  background: ${(props) => (props.valid ? props.theme.color.background : "white")};
  ${(props) => props.theme.neomorph};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7.2rem;
  width: 7.2rem;
`;

const ArrowRight = styled(ArrowIosForwardOutline)`
  cursor: ${(props) => (props.valid ? "pointer" : null)};
  height: 4.2rem;
  width: 4.2rem;
  color: ${(props) => props.theme.color.darkGrey};
`;
const P = styled.p`
  position: absolute;
  margin-top: 13rem;
  left: 0.6rem;
  width: 12rem;
  font-size: ${(props) => props.theme.fontSize.small};
`;
