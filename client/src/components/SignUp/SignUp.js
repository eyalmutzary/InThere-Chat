import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { Button } from '../shared';
import Logo from '../../assets/logo.png';

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    boxShadow: 'none',
  }),
  option: (provided) => ({
    ...provided,
    color: 'white',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'white',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'black',
  }),
  // other styles for other components of react-select can be added here
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
`;
const Title = styled.div`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.main1};
  font-weight: bold;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 20px;
`;
const Input = styled.input`
  border: none;
  width: 80vw;
  font-size: 1.3rem;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;
const InputLabel = styled.div`
  margin-bottom: 8px;
  font-size: 1.3rem;
`;
const Form = styled.form``;

const SelectCountry = styled(Select)`
  width: 80vw;
  font-size: 1.3rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const LoginButton = styled.button`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.main1};
  border: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main1};
  margin-top: 30px;
`;

const Img = styled.img`
  margin: 20px;
  max-width: 60vw;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.3rem;
`;

function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const options = useMemo(() => countryList().getData(), []);
  const [isValidForm, setisValidForm] = useState(true);
  const navigate = useNavigate();

  const alloweNumbersOnly = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const isFormValid = (formResult) => {
    const validatePhoneNumber = formResult.phoneNumber.length < 9;
    const validateNameTooShort = formResult.name.length < 3;
    const validateCountry = !formResult.country || formResult.country.length < 1;
    const validateNameLength = formResult.name > 20;
    return !(validatePhoneNumber || validateNameTooShort || validateCountry || validateNameLength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formResult = {
      name,
      phoneNumber,
      country: country.label,
    };
    if (isFormValid(formResult)) {
      console.log(formResult);
      setisValidForm(true);
      navigate('/main');
    } else {
      console.log('Form is not valid');
      setisValidForm(false);
    }
  };

  return (
    <Container>
      <Img src={Logo} />
      <Title>Welcome!</Title>
      <Form>
        <InputWrapper>
          <InputLabel>Phone Number:</InputLabel>
          <Input
            id="phone-number"
            placeholder="Phone number"
            onKeyPress={alloweNumbersOnly}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete="off"
          />
        </InputWrapper>

        <InputWrapper>
          <InputLabel>Name:</InputLabel>
          <Input
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </InputWrapper>

        <InputWrapper>
          <InputLabel>Where are you from?</InputLabel>
          <SelectCountry options={options} styles={customStyles} value={country} onChange={(value) => setCountry(value)} />
        </InputWrapper>
        {!isValidForm && <ErrorMessage>Invalid inputs</ErrorMessage>}

        <Button onClick={handleSubmit}>Sign up!</Button>
      </Form>
      <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
    </Container>
  );
}

export default SignUp;
