import React, {useContext} from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { GlobalContext } from '../../context/globalContext'
import { dollar } from '../../utils/icons';

function History() {
    const {transactionHistory} = useContext(GlobalContext);
    const nums = useSelector((state) => state.auth.history);
    // console.log(nums);
    const [...history] = transactionHistory(nums)
    // console.log(history);
    return (
        <HistoryStyled>
            {history.map((item) =>{
                const {_id, title, amount, type} = item;
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>
                        
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-$${amount <= 0 ? 0 : amount}` : `+$${amount <= 0 ? 0: amount}`
                            }
                            
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History