import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Reducers/authSlice';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    {/* <IncomeProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
        
    {/* </IncomeProvider> */}
  </React.StrictMode>
);