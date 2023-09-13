import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { GlobalContext } from '../../context/globalContext';
import { dollar } from '../../utils/icons';
// import Chart from '../Chart/Chart';
import { dateFormat } from '../../utils/dateFormat';
import { calender, comment } from '../../utils/icons';
import History from '../History/History';

function Transactions() {
    const {totalExpense ,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses} = useContext(GlobalContext);
    const nums = useSelector((state) => state.auth.history);
    const {transactionHistory} = useContext(GlobalContext);
    const [...history] = transactionHistory(nums)
    return (
        <TransactionsStyled>
            <InnerLayout>
                <h1>Transactions</h1>
                <div className="history-con">
                    {/* <History/> */}
                    {history.map((item) =>{
                        const {_id, title, amount, type, date, description} = item;
                        return (
                            <div key={_id} className="history-item">
                                <h5 className='title' style={{
                                    color: type === 'expense' ? 'red' : 'var(--color-green)'
                                }}>
                                    {title}
                                </h5>
                                <div className="inner-content">
                                    <div className="text">
                                        <p>{calender} {dateFormat(date)}</p>
                                        <p>
                                            {comment}
                                            {description}
                                        </p>

                                        <p className='amount' style={{
                                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                                        }}>
                                        {
                                            type === 'expense' ? `-$${amount <= 0 ? 0 : amount}` : `+$${amount <= 0 ? 0: amount}`
                                        }
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </InnerLayout>
        </TransactionsStyled>
    );
};

const TransactionsStyled = styled.div`
    .amount{
        margin-left: auto;
        font-size: 1.3rem;
        font-weight: bold;
        ${'' /* margin-top: 10px;    */}
        ${'' /* margin-bottom: 1px; */}
    }
    .history-con{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;
        grid-column: 1 / 4;
        height: 78vh;
        overflow-y: scroll;
        &::-webkit-scrollbar{
          width: 1;
        }
        h5{
            font-size: 1.3rem;
            ${'' /* padding-left: 2rem; */}
            position: relative;
            opacity: 0.8;
            ${'' /* width: calc(100% - 100px); */}
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }
        .inner-content{
            display: grid;
            grid-template-columns: 1fr auto;    
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                    ${'' /* padding-left: 1px; */}
                }
            }
        }
    }
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;  
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        ${'' /* align-items: center; */}
    }
    .title{
        flex: 1;
        width: calc(100% - 32px);
    }
    
`;

export default Transactions;