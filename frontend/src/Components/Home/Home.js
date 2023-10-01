import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { MainLayout } from '../../styles/Layouts';
// import bg from '../../img/bg.png';

// import { InnerLayout } from '../../styles/Layouts';
import Dashboard from '../Dashboard/Dashboard';
import Transactions from '../Transactions/Transactions';
import Navigation from '../Navigation/Navigation';
import Income from '../Income/Income'
import Expense from '../Expenses/Expense';
import { setHistory } from '../../Reducers/authSlice';

function Home() {
    const [active, setActive] = useState(1);
    const dispatch = useDispatch();
    const displayData = () => {
        switch(active){
            case 1:
                dispatch(setHistory(5));
                return <Dashboard/>
            case 2:
                dispatch(setHistory(10));
                return <Transactions/>
            case 3:
                return <Income/>
            case 4: 
                return <Expense/>
        }
    }
    
    return (
        <HomeStyled>
            <MainLayout>
                
                <Navigation active={active} setActive={setActive}/>
                <main>
                    {displayData()}
                </main>
            </MainLayout>
        </HomeStyled>
    );
};

const HomeStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    position: relative;
    main{
        flex: 1;
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        ${'' /* overflow-x: hidden;
        &::-webkit-scrollbar{
          width: 0;
        } */}
    }
`;

export default Home