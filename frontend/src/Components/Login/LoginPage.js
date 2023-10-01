import React, { useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
// import { setLogin } from "state";
import { login, setAccessToken, setUserId, setUsername } from '../../Reducers/authSlice';
import styled from 'styled-components';
import axios from 'axios';
import { InnerLayout } from '../../styles/Layouts';
import Button from '../Button/Button';
import { NotifyError } from '../../Function/Notify';
// import { useHistory } from 'react-router-dom';

const BASE_URL = "https://expensetracker-backend-foth.onrender.com/";

function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // console.log(email, password);
      // Notify('ye');
      const isLogin= await axios.post(
          `${BASE_URL}auth/login`, 
          { email, password }
      );
      console.log(isLogin)
      if (isLogin) {
        // console.log(isLogin.data);
        cookies.set('jwt', isLogin.data.refreshToken, {
            // httpOnly: true, //accessible only by web server 
            // path: '/',
            // secure: true, //https
            // sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60
            // maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        });
        dispatch(login(true));
        dispatch(setAccessToken(isLogin.data.accessToken))
        // dispatch(login({isAuthenticated: true, accessToken: isLogin.data.accessToken}))
        // dispatch(setAccessToken(isLogin.data.accessToken));
        dispatch(setUserId(isLogin.data.foundUser._id))
        dispatch(setUsername(isLogin.data.foundUser.firstName + ' ' + isLogin.data.foundUser.lastName))
        navigate("/home");
      }
    } catch (error) {
      // Handle login error
      // console.log(error.response);
      NotifyError(error.response.data.message);
    }
  };

  const register = async () => {
    try {
      navigate("/register");
    } catch (error) {
      NotifyError(error.response.data.message);
    }
  }

  return (
    <LoginPageStyled>
      <InnerLayout>
        <div className='header'>
          <h1> Expense Tracker Web App </h1>
        </div>
        <br></br>
        <br></br>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button 
            type="submit"
            name={'Login'}
            bPad={'.8rem 1.6rem'}
            bRad={'30px'} 
            bg={'var(--color-accent'}
            color={'#fff'}
          />
          <p> Don't have an account? </p>
          <Button 
            name={'Register'}
            onClick={() => {register()}}
            bPad={'.8rem 1.6rem'}
            bRad={'30px'}
            bg={'var(--color-accent'}
            color={'#fff'}
          />
          
          
          
        </form>
      </InnerLayout>
    </LoginPageStyled>
  )
}

const LoginPageStyled = styled.div`
  .middle {
    ${'' /* display: block; */}
    margin-top: 10px;
  }
  .header {
    display: flex;
    justify-content: center; 
    align-items: center; 

  }
  
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
  input{
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: .5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder{
        color: rgba(34, 34, 96, 0.4);
    }
  }
    ${'' /* .loginBtn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    } */}
`;

export default LoginPage;
