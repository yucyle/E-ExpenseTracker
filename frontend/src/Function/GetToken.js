import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { NotifyError } from './Notify';
// import Cookies from 'universal-cookie';

import { login, setUsername, setUserId, setAccessToken } from '../Reducers/authSlice';

const BASE_URL = "http://localhost:5000/";

const GetToken = () => {
    const dispatch = useDispatch();
    var accessToken = useSelector((state) => state.auth.accessToken);
    const [trueSuccess, setTrueSuccess] = useState(false);
    const [trueError, setError] = useState(false);
    const effectRan = useRef(false);
    
    useEffect(() => {
        if (effectRan.current === true) {
            const fetchAccessToken = async () => {
                const response = await axios.get(`${BASE_URL}auth/refresh`, { withCredentials: true, credentials: 'include' })
                .catch ((err) => {
                    NotifyError(err); 
                    setError(true);
                    console.log(err);
                });
                if (response) {
                    setTrueSuccess(true)
                    const { userId, username } = response.data;
                    // accessToken = response.data.accessToken;
                    dispatch(login());
                    dispatch(setAccessToken(response.data.accessToken));
                    dispatch(setUserId(userId));
                    dispatch(setUsername(username));
                }
            };
            if (!accessToken) {
                fetchAccessToken();
            };
        }
        return () => effectRan.current = true;
    }, []);
    
    let content;
    if (trueError === true) {
        content = (
            <Link to ='/'>Please Login Again</Link>
        );
    }
    else if (!accessToken && trueError === false && trueSuccess === false) {
        // console.log('error', accessToken);
        content = (
            <p>Loading</p>
        );
    } 

    else if (accessToken && trueError === false) {
        content = <Outlet/>;
    }
    return content;
};

export default GetToken

