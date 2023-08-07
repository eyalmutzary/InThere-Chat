import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
`;

const Stage = styled.div`
  background-color: ${(props) => (props.active ? props.theme.colors.unique2 : props.theme.colors.subContainer)};
  color: ${(props) => (props.active ? props.theme.colors.mainText : props.theme.colors.nonMainText)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: ${(props) => (props.active ? '50px' : '25px')};
  height: ${(props) => (props.active ? '50px' : '25px')};
  font-weight: bold;
  font-size: 20px;
  margin: 12px;

`;

const Progress = ({stageNum}) => {
  const stages = [1, 2, 3, 4];

  return (
    <ProgressContainer>
      {stages.map((stage) => (
        <Stage key={stage} active={stage === stageNum}>
          {/*{stage}*/}
        </Stage>
      ))}
    </ProgressContainer>
  );
};

export default Progress;

