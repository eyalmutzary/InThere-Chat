import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

const Title = styled.div`
    font-size: 24px;
    margin-bottom: 12px;
    font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  background-color: ${({theme}) => theme.colors.container};
  border-radius: 5px;
  padding: 0 10px;
  font-size: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 140px;
  border: none;
  background-color: ${({theme}) => theme.colors.container};
  border-radius: 5px;
  padding: 10px;
  font-size: 20px;
  resize: none;
`;

const RowWrapper = styled.div`
    margin: 30px 0;
`;



const DetailsStage = ({form, setForm}) => {

  return (
    <Container>
        <RowWrapper>
            <Title>Event Title:</Title>
            <Input onChange={(e) => {
              setForm((oldForm) => {
                const newForm = { ...oldForm };
                newForm.title = e.target.value;
                return newForm;
              });
            }}
            />
        </RowWrapper>

        <RowWrapper>
            <Title>Description:</Title>
            <TextArea onChange={(e) => {
              setForm((oldForm) => {
                const newForm = { ...oldForm };
                newForm.description = e.target.value;
                return newForm;
              });
            }}
            />
        </RowWrapper>
    </Container>
  );
};

export default DetailsStage;