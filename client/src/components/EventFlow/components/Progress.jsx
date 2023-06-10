import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 40px;
    border: 1px solid ${({ theme }) => theme.colors.darkGray};
    height: 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    font-size: 20px;
`;

const StageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
`;

const Stage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid ${({ theme, isSelected }) => isSelected ? theme.colors.main1 : theme.colors.darkGray};
    background-color: ${({ theme, isSelected }) => isSelected ? theme.colors.white : theme.colors.darkGray};
`;

const Text = styled.div`
    margin-top: 5px;
    color: ${({ theme }) => theme.colors.darkGray};
`;


const Progress = ({ stageNum }) => {
    
  return (
    <Container>
        <Stage isSelected={stageNum === 1}>1</Stage>
        <Stage isSelected={stageNum === 2}>2</Stage>
        <Stage isSelected={stageNum === 3}>3</Stage>
        <Stage isSelected={stageNum === 4}>4</Stage>
    </Container> 
  );
};

export default Progress;