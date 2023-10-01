import React, { createContext, useState } from "react"
import { useSelector } from "react-redux";
import axios from 'axios';
import { NotifySuccess, NotifyError } from "../Function/Notify";

const BASE_URL = "https://expensetracker-backend-foth.onrender.com/";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.userId);


    const addIncome = async(income) => {
        const response = await axios.post(`${BASE_URL}incomes/${userId}`, income, { 
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                console.log(errorMessage);
                NotifyError(errorMessage);
                setError(errorMessage);
            } else {
                NotifyError('Error');
                console.log('An error occurred while making the request.');
            }
        });
        if (response) NotifySuccess('Income added!');
        getIncomes();
    };

    const getIncomes = async() => {
        const response = await axios.get(`${BASE_URL}incomes/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                NotifyError(errorMessage);
                setError(errorMessage);
            } else {
                NotifyError('Error');
                console.log('An error occurred while making the request.');
            }
        });
        setIncomes(response.data);
    };
    const updateIncome = async (updated, id) => {
        const response = await axios.put(`${BASE_URL}incomes/${userId}/${id}`, updated, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                NotifyError(errorMessage);
                setError(errorMessage);
            } else {
                NotifyError('Error');
                console.log('An error occurred while making the request.');
            }
        });
        if (response) NotifySuccess('Income updated!');
        getIncomes();
    };

    const deleteIncome = async (id) => {
        // console.log(id)
        const response = await axios.delete(`${BASE_URL}incomes/${userId}/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                NotifyError(errorMessage);
                setError(errorMessage);
            } else {
                NotifyError('Error');
                console.log('An error occurred while making the request.');
            }
        });
        if (response) NotifySuccess('Income deleted!');
        console.log(response);
        getIncomes();
    };

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome += income.amount
        });
        return totalIncome;
    };

    const addExpense = async(expense) => {
        const response = await axios.post(`${BASE_URL}expenses/${userId}`, expense, { 
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                NotifyError(errorMessage);
                setError(errorMessage);
            } else {
                NotifyError('Error');
                console.log('An error occurred while making the request.');
            }
        });
        console.log(response);
        if (response) NotifySuccess('Expense added!');
        console.log(response);
        getExpenses();
    };

    const getExpenses = async() => {
        const response = await axios.get(`${BASE_URL}expenses/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                NotifyError(errorMessage);
                setError(errorMessage);
            } else {
                NotifyError('Error');
                console.log('An error occurred while making the request.');
            }
        });
        setExpenses(response.data);
    };
    
    const updateExpense = async (updated, id) => {
        const response = await axios.put(`${BASE_URL}expenses/${userId}/${id}`, updated, {
            headers: { Authorization: `Bearer ${accessToken}`}
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                NotifyError(errorMessage);
                setError(errorMessage);
            } else {
                NotifyError('Error');
                console.log('An error occurred while making the request.');
            }
        });
        if (response) NotifySuccess('Expense updated!');
        console.log(response);
        getExpenses();
    };

    const deleteExpense = async (id) => {
        // console.log(id)
        const response = await axios.delete(`${BASE_URL}expenses/${userId}/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                NotifyError(errorMessage);
                setError(errorMessage);
            } else {
                NotifyError('Error');
                console.log('An error occurred while making the request.');
            }
        });
        if (response) NotifySuccess('Expense deleted!');
        console.log(response);
        getExpenses();
    };

    const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense += expense.amount;
        });
        return totalExpense;
    };

    const totalBalance = () => {
        return totalIncome() - totalExpense()
    };

    const transactionHistory = (nums) => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })
        return history.slice(0, nums);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            updateIncome,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            expenses,
            updateExpense,
            deleteExpense,
            totalExpense,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};