import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup';
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, x, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt, edit } from '../../utils/icons';
import Button from '../Button/Button';
import { GlobalContext } from '../../context/globalContext';
import PopupForm from '../Form/popupForm';
// import IncomeForm from '../Form/incomeForm';
function Item({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {
    // const { incomes, expenses, updateIncome, updateExpense } = useContext(GlobalContext);
    // const [error, setError] = useState(null)
    const data = {
        id: id,
        title: title,
        amount: amount,
        date: date,
        category: category,
        description:description,
        type: type
    };
    const incomeIcon = () =>{
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    const expenseIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    return (
        <ItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseIcon() : incomeIcon()}
            </div>
            <div className="content">
                <div className='firstline'> 
                    <h5 className='title'>{title}</h5>
                    {/* <p className='edit'>{edit}</p> */}
                    <div className="edit">
                        <Popup trigger=
                            <Button icon={edit}/>
                            modal nested>
                            {
                                close => (
                                    <div>
                                        <PopupContainer>
                                            <PopupContent>
                                                <div className='x'>
                                                    <Button icon={x} onClick={() => close()}/>
                                                </div>
                                                
                                                <PopupForm data={data}/>
                                                
                                            </PopupContent>
                                        </PopupContainer>
                                    </div>
                                )
                            }
                        </Popup>
                    </div>
                </div>

                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
                
            </div>
        </ItemStyled>
    )
}

const ItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .edit{
        width: 32px;
        align-items: center;
        justify-content: center;
    }
    .firstline{
        display: flex;
    }
    .title{
        flex: 1;
        width: calc(100% - 32px);
    }
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            ${'' /* opacity: none; */}
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
            display: flex;
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
                    padding-left: 1px;
                }
            }
        }
    }
`;

const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PopupContent = styled.div`
    background-color: #fff;
    padding: 30px 15px 15px;
    border-radius: 8px;
    .x{
        float: right;
        margin-top: -25px;
        ${'' /* margin-right: -20px; */}
    }   
`;

export default Item