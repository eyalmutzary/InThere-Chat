import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../shared';
import 'react-phone-number-input/style.css';
import Logo from '../../assets/logo.png';
import { authActions } from '../shared/store';

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
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
  margin-bottom: 30px;

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

const LoginButton = styled.button`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.main1};
  border: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main1};
  margin-top: 30px;
`;

const Img = styled.img`
  margin-bottom: 100px;
  max-width: 60vw;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.3rem;
`;

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isValidForm, setisValidForm] = useState(true);
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    // Get the user's location
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const token = 'e87a11528ea378abc061e05fc60e66a5';

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`)
        // fetch(`https://secure.geonames.org/findNearbyJSON?lat=${lat}&lng=${lon}&username=eyalmutzary`)
        .then((response) => response.json())
        .then((data) => {
          setLocation(data.name);
        });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formResult = {
      name,
      phoneNumber,
      currentLocation: location,
    };
    if (formResult.name !== '' || formResult.phoneNumber !== '') {
      setisValidForm(true);
      dispatch(authActions.login(
        {
          name: formResult.name,
          phoneNumber: formResult.phoneNumber,
          currentLocation: formResult.currentLocation,
        },
      ));
      localStorage.setItem('auth', JSON.stringify(formResult));
      navigate('/main'); // Replace history.push('/main') with navigate('/main')
    } else {
      setisValidForm(false);
    }
  };

  return (
    <Container>
      <Img src={Logo} />
      <Title>Login</Title>
      <Form>
        <InputWrapper>
          <InputLabel>Phone Number:</InputLabel>
          <Input
            id="phone-number"
            placeholder="Phone number"
            // onKeyPress={alloweNumbersOnly}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <InputLabel>Name:</InputLabel>
          <Input
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputWrapper>
        {!isValidForm && <ErrorMessage>Invalid inputs</ErrorMessage>}
        <Button onClick={handleSubmit}>Login!</Button>

      </Form>
      <Link onClick={null} to="/signup">
        <LoginButton>Sign-Up</LoginButton>
      </Link>
    </Container>

  );
}

export default Login;
