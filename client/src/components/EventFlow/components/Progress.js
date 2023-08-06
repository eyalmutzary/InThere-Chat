import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Stage = styled.div`
  background-color: ${(props) => (props.active ? props.theme.colors.unique2 : props.theme.colors.container)};
  color: ${(props) => (props.active ? props.theme.colors.mainText : props.theme.colors.nonMainText)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
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
          {stage}
        </Stage>
      ))}
    </ProgressContainer>
  );
};

export default Progress;

