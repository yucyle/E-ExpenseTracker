import React, { useState, useContext } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import ava from '../../img/ava.png'
import { signout } from '../../utils/icons'
import { menuItems } from '../../utils/menuItems'
import { NotifyError } from '../../Function/Notify';
import { GlobalContext } from '../../context/globalContext';
import Cookies from 'universal-cookie';

function Navigation({active, setActive}) {
    const username = useSelector((state) => state.auth.username);
    const { totalBalance } = useContext(GlobalContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const cookies = new Cookies();
    
    const logout = async() => {
        try {
            cookies.remove('jwt');
            
            // await axios.post(`${BASE_URL}auth/logout`, { withCredentials: true, credentials: 'include' })
                // console.log(out);
            
            console.log('Log out successfully');
            navigate("/");   
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                NotifyError(errorMessage);
                setError(errorMessage);
            } else {
                NotifyError('Error');
                console.log('An error occurred while making the request.');
            }
        }
    };

    return (
        <NavStyled>
            <div className="user-con">
                <img src={ava} alt="" />
                <div className="text">
                    <h2>{username}</h2>
                    <p>{totalBalance()} $</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li onClick={() => {logout()}}>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }
    .bottom-nav{
        cursor: pointer
    }
    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation