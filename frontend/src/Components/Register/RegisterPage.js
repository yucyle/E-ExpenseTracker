import React, { useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
// import { setLogin } from "state";
import { login, setAccessToken, setUserId, setUsername } from '../../Reducers/authSlice';
import { signout } from '../../utils/icons'
import styled from 'styled-components';
import axios from 'axios';
import { InnerLayout } from '../../styles/Layouts';
import Button from '../Button/Button';
import { NotifyError } from '../../Function/Notify';
// import { useHistory } from 'react-router-dom';

const BASE_URL = "https://expensetracker-backend-foth.onrender.com/";

function RegisterPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const isRegister = await axios.post(
          `${BASE_URL}auth/register`, 
          { firstName, lastName, email, password }
      );

      if (isRegister) {
        navigate("/");
      }
    } catch (error) {
      // Handle login error
      NotifyError(error.response.data.message);
    }
  };

  return (
    <RegisterPageStyled>
        <InnerLayout>
            <div className='header'>
            <h1> Register for Expense Tracker Web App </h1>
            </div>
            <br></br>
            <br></br>
           
            <form onSubmit={handleRegister}>
                <input
                    type="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                    type="lastName"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                />
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
                    name={'Register'}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'} 
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
                <div className="bottom-nav">
                    <li onClick={() => {
                        navigate("/");
                        }}>
                        {signout} Login
                    </li>
                </div>
            </form>
            
        </InnerLayout>
    </RegisterPageStyled>
  )
}

const RegisterPageStyled = styled.div`
    .bottom-nav{
        cursor: pointer
    }
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
`;

export default RegisterPage;
