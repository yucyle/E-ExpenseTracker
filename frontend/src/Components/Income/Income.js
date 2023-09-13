import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import Item from '../Item/Item';
import { GlobalContext } from '../../context/globalContext';
import IncomeForm from '../Form/incomeForm';

function Income() {
    const {incomes, getIncomes, deleteIncome, totalIncome} = useContext(GlobalContext);
    
    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className='income-content'>
                    <div className='form-container'>
                        <IncomeForm/>
                    </div>
                    <div className='incomes'>
                        {incomes.sort((a, b) => new Date(b.date) - new Date(a.date)).map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return <Item
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                            
                        })}
                        
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: .5rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
            height: 54vh;
            overflow-y: scroll;
            &::-webkit-scrollbar{
                width: 1;
            }
        }
    }
`;

export default Income