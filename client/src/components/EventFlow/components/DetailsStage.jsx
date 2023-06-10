import React from 'react';
import styled from 'styled-components';
import { Layout } from '../../shared/components';
import { Button } from '../../shared';

const Container = styled(Layout)`
`;

const Title = styled.div`
    font-size: 24px;
    /* color: ${({ theme }) => theme.colors.darkGray}; */
    margin-bottom: 12px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    border: none;
    background-color: ${({ theme }) => theme.colors.main3};
    border-radius: 5px;
    padding: 0px 10px;
    font-size: 20px;
    `;

const TextArea = styled.textarea`
    width: 100%;
    height: 140px;
    border: none;
    background-color: ${({ theme }) => theme.colors.main3};
    border-radius: 5px;
    padding: 10px;
    font-size: 20px;
    resize: none;
`;

const RowWrapper = styled.div`
    margin: 30px 0px;
`;



const DetailsStage = () => {
    
  return (
    <Container>
        <RowWrapper>
            <Title>Event Title:</Title>
            <Input />
        </RowWrapper>

        <RowWrapper>
            <Title>Description:</Title>
            <TextArea />
        </RowWrapper>
    </Container>
  );
};

export default DetailsStage;