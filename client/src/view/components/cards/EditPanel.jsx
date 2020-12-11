import React from "react";
import styled from "styled-components";
import { Exit } from "view/components/buttons/Exit";
import { Back, TripleSliderSelector, DualSelect, ColorSelect, EditTitle, Dropdown } from "view/components";
import { Trash2 } from "@styled-icons/feather/Trash2";

export const EditPanel = ({ editPeriod }) => {
  const { handleColorChange, handleTitleChange, handleDelete, handleExit, colorValue, nameValue, newStream, selectedPage } = editPeriod;

  return (
    <Wrapper>
      <Header>
        <BackWrapper>
          <Back handleChange={() => handleExit()} />
        </BackWrapper>
        <ColorSelect handleChange={(value) => handleColorChange(value)} value={colorValue} />
        {selectedPage === "savings" ? (
          <>
            {" "}
            <DualSelect {...editPeriod.dualSelectorProps} />
            <Dropdown {...editPeriod.dropdownProps} />{" "}
          </>
        ) : (
          <EditTitle handleChange={(value) => handleTitleChange(value)} value={nameValue} selectedFocus={newStream} />
        )}
        <Exit handleChange={() => handleExit()} />
      </Header>
      <Center>
        <TripleSliderSelector {...editPeriod.tripleSliders} />
      </Center>
      <BottomRight>
        <TrashIcon onClick={() => handleDelete()} />
      </BottomRight>
    </Wrapper>
  );
};

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
  height: 25rem;
  width: 75rem;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0.01, 0.08);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: -2rem;
  z-index: 200;
`;
const Header = styled.div`
  height: 4rem;
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 0.5rem;
  color: white;
  font-size: ${(props) => props.theme.fontSize.smallMedium};
  border-bottom: 0.3px solid ${(props) => props.theme.color.lightGrey};
`;

const TrashIcon = styled(Trash2)`
  height: 2.5rem;
  width: 2.5rem;
  color: #73706e;
`;
const Center = styled.div`
  display: flex;
  position: absolute;
  top: 5rem;
`;
const BottomRight = styled.div`
  position: absolute;
  top: 21rem;
  right: 1rem;
`;
const BackWrapper = styled.div`
  height: 3rem;
  width: 3rem;
  position: absolute;
  top: -0.7rem;
  left: -0.7rem;
`;
