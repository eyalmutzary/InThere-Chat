import React, { useEffect, useMemo, useState } from 'react';
import { Button, Icon } from '../shared';
import styled from "styled-components";
// import TextField from '@mui/material/TextField';
import 'react-phone-number-input/style.css'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Logo from '../../assets/logo.png'
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authActions } from '../shared/store';
import {useDispatch} from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-color: #e6f3ff;
`
const Title = styled.div`
    font-size: 1.5rem;
    color: #0069cc;
    font-weight: bold;
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 20px;
`
const Input = styled.input`
    border: none;
    width: 80vw;
    font-size: 1.3rem;
    padding: 12px;
    border-radius: 8px;
`
const InputLabel = styled.div`
    margin-bottom: 8px;
    font-size: 1.3rem;
`
const Form = styled.form``

const SelectCountry = styled(Select)`
    width: 80vw;
    font-size: 1.3rem;
`

const LoginButton = styled.button`
    font-size: 1.5rem;
    color: #0069cc;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid #0069cc;
    margin-top: 30px;
`

const Img = styled.img`
    margin-bottom: 100px;
    max-width: 60vw;
`

const ErrorMessage = styled.div`
    color: red;
    font-size: 1.3rem;
`

const Login = ({history}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [isValidForm, setisValidForm] = useState(true)
    const [location, setLocation] = useState('')
    const dispatch = useDispatch()

    
    useEffect(() => {
        // Get the user's location
        navigator.geolocation.getCurrentPosition(function(position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const token = 'e87a11528ea378abc061e05fc60e66a5'
          console.log(lat, lon);
          
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`)
          // fetch(`https://secure.geonames.org/findNearbyJSON?lat=${lat}&lng=${lon}&username=eyalmutzary`)
          .then(response => response.json())
          .then(data => {
            console.log(data.name)
            setLocation(data.name);
          });
        });
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formResult = {
            name: name,
            phoneNumber: phoneNumber,
            currentLocation: location,
        }
        if (formResult.name !== '' || formResult.phoneNumber !== '') {
            console.log(formResult)
            setisValidForm(true)
            dispatch(authActions.login(
                {name: formResult.name, 
                phoneNumber: formResult.phoneNumber, 
                currentLocation: formResult.currentLocation
            }))
            localStorage.setItem('auth', JSON.stringify(formResult))
            history.push('/main');
        }
        else {
            setisValidForm(false)
            console.log("Form is not valid")
        }
    }

    return (
    <Container>
        <Img src={Logo}/>
        <Title>Login</Title>
        <Form>
            <InputWrapper>
                <InputLabel>Phone Number:</InputLabel>
                <Input id={"phone-number"} 
                    placeholder={"Phone number"} 
                    // onKeyPress={alloweNumbersOnly} 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)}/>
            </InputWrapper>

            <InputWrapper>
                <InputLabel>Name:</InputLabel>
                <Input id={"name"}
                 placeholder={"Name"}
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 />
            </InputWrapper>
            {!isValidForm && <ErrorMessage>Invalid inputs</ErrorMessage>}
            <Button onClick={handleSubmit}>Login!</Button>
            
        </Form>
        <Link onClick={null} to={`/signup`}>
            <LoginButton>Sign-Up</LoginButton>
        </Link>
    </Container>

)};

export default Login;