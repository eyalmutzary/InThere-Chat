import React, { useMemo, useState } from 'react';
import { Button, Icon } from '../shared';
import styled from "styled-components";
// import TextField from '@mui/material/TextField';
import 'react-phone-number-input/style.css'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Logo from '../../assets/logo.png'
import { Link, useHistory } from 'react-router-dom';

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
// const Button = styled.button`
//     /* width: 40vw; */
//     font-size: 1.5rem;
//     background-color: #0069cc;
//     color: white;
//     border: none;
//     border-radius: 8px;
//     padding: 12px 24px 12px 24px;
//     margin: 20px;
// `

const LoginButton = styled.button`
    font-size: 1.5rem;
    color: #0069cc;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid #0069cc;
    margin-top: 30px;
`

const Img = styled.img`
    margin: 20px;
    max-width: 60vw;
`

const ErrorMessage = styled.div`
    color: red;
    font-size: 1.3rem;
`

const SignUp = ({history}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const [isValidForm, setisValidForm] = useState(true)

    // const changeHandler = value => {
    //     setValue(value)
    //   }
    const alloweNumbersOnly = (event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
    }

    const isFormValid = (formResult) => {
        const validatePhoneNumber = formResult.phoneNumber.length < 9
        const validateNameTooShort = formResult.name.length < 3
        const validateCountry = !formResult.country || formResult.country.length < 1
        const validateNameLength = formResult.name > 20
        return !(validatePhoneNumber || validateNameTooShort || validateCountry || validateNameLength)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formResult = {
            name: name,
            phoneNumber: phoneNumber,
            country: country.label
        }
        if(isFormValid(formResult)){
            console.log(formResult)
            setisValidForm(true)
            history.push('/main');
        }
        else {
            console.log("Form is not valid")
            setisValidForm(false)
            
        }
    }

    return (
    <Container>
        <Img src={Logo}/>
        <Title>Welcome!</Title>
        <Form>
            <InputWrapper>
                <InputLabel>Phone Number:</InputLabel>
                <Input id={"phone-number"} 
                    placeholder={"Phone number"} 
                    onKeyPress={alloweNumbersOnly} 
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
            
            <InputWrapper>
                <InputLabel>Where are you from?</InputLabel>
                <SelectCountry options={options} value={country} onChange={(value) => setCountry(value)}  />
            </InputWrapper>
            {!isValidForm && <ErrorMessage>Invalid inputs</ErrorMessage>}

            
            {/* <Link onClick={(e) => handleSubmit(e) ? e.preventDefault() : null} to={`/main`}> */}
                <Button onClick={handleSubmit}>Sign up!</Button>
            {/* </Link> */}

        </Form>
        <Link onClick={null} to={`/login`}>
            <LoginButton>Login</LoginButton>
        </Link>
    </Container>

)};

export default SignUp;