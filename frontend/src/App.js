import React, { useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import bg from './img/bg.png';
import Orb from './Components/Orb/Orb';
import { ToastContainer } from 'react-toastify';
import Home from './Components/Home/Home';
import LoginPage from './Components/Login/LoginPage';
import { GlobalProvider } from './context/globalContext';
import GetToken  from './Function/GetToken';
// import { GetToken } from './Function/GetToken';

function App() {
    // const isAuth = Boolean(useSelector((state) => state.auth.accessToken));
    
    // const userId = useSelector((state) => state.auth.userId);
       
    // const orbMemo = useMemo(() => {
    //     return <Orb />
    // }, [])

    return (
        <AppStyled bg={bg} className="App">
            {/* {orbMemo} */}
            {/* <Orb /> */}
            <GlobalProvider>
                <ToastContainer />
                <BrowserRouter>
                    <Routes>
                        
                        <Route path="/" element={<LoginPage />} />
                        <Route element={<GetToken/>}>
                            <Route
                                path="/home"
                                element={<Home/>}
                                // element={isAuth ? <Home /> : <Navigate to="/" />}
                            />
                    {/* <Route
                    path="/incomes/:userId"
                    element={isAuth ? <Income /> : <Navigate to="/" />}
                    />
                    <Route
                    path="/expenses/:userId"
                    element={isAuth ? <Expenses /> : <Navigate to="/" />}
                    /> */}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </GlobalProvider>
        {/* <MainLayout>
            <LoginPage />
        </MainLayout>
        <MainLayout>
            <Navigation active={active} setActive={setActive}/>
            <main>
            {displayData()}
            </main>
        </MainLayout> */}
        </AppStyled>
    );
}

const AppStyled = styled.div`
  ${'' /* height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  } */}
`;


export default App;
