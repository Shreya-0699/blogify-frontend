import sideBackground from '@/assets/side-background.png';
// import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    width: 100%;
`;

const BackgroundImage = styled.img`
    width: 100%;
    flex: 1;
    height: 100vh;
    object-fit: cover;
    background-image: url(${sideBackground});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

const GreenLine = styled.div`
    width: 0.5rem;
    background-color: #6EEB83;
    height: 100vh;
`

const StyledInput = styled.input`
  background-color: transparent;
  border: 1px solid #6EEB83;
  color: white;
  /* padding: 0.75rem 1rem; */
  border-radius: 0px;
  font-size: 1rem;
  width: 100%;
  height: 6.7rem;
  font-size: 1.8rem;
  padding-left: 3.5rem;
  padding-top: 2.2rem;
  padding-bottom: 2.5rem;
  &::placeholder {
    font-size: 1.8rem;
    /* padding-left: 2.5rem; */
    padding-top: 2.2rem;
    padding-bottom: 2.5rem;
    color: #A5A5A5;
  }

  &:focus {
    outline: none;
    border-color: #4ac26b;
    box-shadow: 0 0 0 2px rgba(110, 235, 131, 0.3);
  }
`;


const PasswordInput = styled.input.attrs({type: 'password'})`
  background-color: transparent;
  border: 1px solid #6EEB83;
  color: white;
  /* padding: 0.75rem 1rem; */
  border-radius: 0px;
  font-size: 1rem;
  width: 100%;
  height: 6.7rem;
  font-size: 1.8rem;
  padding-left: 3.5rem;
  padding-top: 2.2rem;
  padding-bottom: 2.5rem;
  letter-spacing: 0.5rem;
  &::placeholder {
    font-size: 1.8rem;
    letter-spacing: normal;
    /* padding-left: 2.5rem; */
    padding-top: 2.2rem;
    padding-bottom: 2.5rem;
    color: #A5A5A5;
  }

  &:focus {
    outline: none;
    border-color: #4ac26b;
    box-shadow: 0 0 0 2px rgba(110, 235, 131, 0.3);
  }
`;


const SubmitContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


const SubmitButton = styled.button`
    display: flex;
    background-color: #6EEB83;
    justify-content: center;
    align-items: center;
    width: 20rem;
    height: 6.7rem;
    color: #000;
    border: none;
    font-family: "Lexend Deca";
    font-size: 2.2rem;
    font-weight: 600;
    border-radius: 0px;
    cursor: pointer;
`;

const AltSignText = styled.div`
    color: #FFF;
    font-family: "Lexend Deca";
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    a {
        color: #6EEB83;
    }
`


const FormContainer = styled.div`
    flex: 2;
    padding: 8.7rem 15rem 12.5rem 15rem;
    height: 100%;
    width: 100%;
    display: flex;
    background: #272727;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5rem;
`

const WelcomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: white;
    font-family: 'DM Serif Display', serif;
    h1 {
        font-size: 5.4rem;
        font-weight: 400;
    }
    p {
        font-family: "Lexend Deca";
        font-weight: 300;
        font-size: 2.7rem;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 100%;
    height: 100%;
`;

export default function Login() {
    return (
        <Container>
            <BackgroundImage />
            <GreenLine />
            <FormContainer>
                <WelcomeContainer>
                    <h1>Welcome</h1>
                    <p>Let’s sign you up quickly</p>
                </WelcomeContainer>
                <Form>
                    <StyledInput type="email" placeholder="Email" required />
                    <PasswordInput type="password" placeholder="Password" required />
                    <SubmitContainer>
                        <SubmitButton type="submit">SUBMIT</SubmitButton>
                        <AltSignText>
                            Already have an account? <a href="/login">Login</a>
                        </AltSignText>
                    </SubmitContainer>
                </Form>
            </FormContainer>
        </Container>
    )
}