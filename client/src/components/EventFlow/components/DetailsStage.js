import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({theme}) => theme.colors.container};
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 12px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.mainText};
  margin: 12px;
`;

const Input = styled.input`
  height: 40px;
  border: none;
  background-color: ${({theme}) => theme.colors.subContainer};
  border-radius: 20px;
  font-size: 20px;
  margin: 8px;
  padding: 4px;
`;

const TextArea = styled.textarea`
  height: 140px;
  border: none;
  background-color: ${({theme}) => theme.colors.subContainer};
  border-radius: 20px;
  font-size: 20px;
  resize: none;
  margin: 8px;
  padding: 4px;
`;

// const RowWrapper = styled.div`
//     margin: 30px 0;
// `;


const DetailsStage = ({form, setForm}) => {

  return (
    <Container>
      <Title>Event Title:</Title>
      <Input onChange={(e) => {
        setForm((oldForm) => {
          const newForm = {...oldForm};
          newForm.title = e.target.value;
          return newForm;
        });
      }}
      />
      <Title>Description:</Title>
      <TextArea onChange={(e) => {
        setForm((oldForm) => {
          const newForm = {...oldForm};
          newForm.description = e.target.value;
          return newForm;
        });
      }}
      />
    </Container>
  );
};

export default DetailsStage;