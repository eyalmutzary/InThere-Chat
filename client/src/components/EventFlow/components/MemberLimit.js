import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100px;
    height: 40px;
    border: none;
    background-color: ${({ theme }) => theme.colors.main3};
    border-radius: 5px;
    padding: 10px;
    font-size: 26px;
    margin-bottom: 20px;
`;

const NumberButton = styled.button`
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.colors.main3};
    font-size: 26px;
    margin: 8px;
`;

const DeleteButton = styled(NumberButton)`
    background-color: ${({ theme }) => theme.colors.darkGray};
`;

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
`;


const MemberLimit = ({ membersLimit, setForm }) => {

  const handleNumberClick = (num) => {
    if (num === '0' && membersLimit === '') return;
    if (num === 'X') {
      if (membersLimit.length === 0) return;
      setForm((oldForm) => {
        const newForm = { ...oldForm };
        newForm.membersLimit = oldForm.membersLimit.slice(0, -1);
        return newForm;
      });
      return;
    }
    if (membersLimit.length >= 3) return;
    setForm((oldForm) => {
      const newForm = {...oldForm};
      newForm.membersLimit = oldForm.membersLimit.concat(num);
      return newForm;
    });
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setForm((oldForm) => ({
      ...oldForm,
      membersLimit: newValue,
    }));
  };

  return (
    <Container>
      <Title>Members Limit</Title>
      <Input value={membersLimit} onChange={handleInputChange}/>
      <RowWrapper>
        <NumberButton onClick={() => handleNumberClick('1')}>1</NumberButton>
        <NumberButton onClick={() => handleNumberClick('2')}>2</NumberButton>
        <NumberButton onClick={() => handleNumberClick('3')}>3</NumberButton>
      </RowWrapper>
      <RowWrapper>
        <NumberButton onClick={() => handleNumberClick('4')}>4</NumberButton>
        <NumberButton onClick={() => handleNumberClick('5')}>5</NumberButton>
        <NumberButton onClick={() => handleNumberClick('6')}>6</NumberButton>
      </RowWrapper>
      <RowWrapper>
        <NumberButton onClick={() => handleNumberClick('7')}>7</NumberButton>
        <NumberButton onClick={() => handleNumberClick('8')}>8</NumberButton>
        <NumberButton onClick={() => handleNumberClick('9')}>9</NumberButton>
      </RowWrapper>
          <RowWrapper>
              <div style={{width: '60px', margin: '12px'}}/>
              <NumberButton onClick={() => handleNumberClick('0')}>0</NumberButton>
              <DeleteButton onClick={() => handleNumberClick('X')}>X</DeleteButton>
          </RowWrapper>
      </Container>
  );
};

export default MemberLimit;