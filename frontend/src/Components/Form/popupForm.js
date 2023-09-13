import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from '../Button/Button';
import { GlobalContext } from '../../context/globalContext';
import { plus } from '../../utils/icons';
import { dateFormat } from '../../utils/dateFormat';

function PopupForm({
    data
}) {
    const { updateIncome, updateExpense } = useContext(GlobalContext);
    const [error, setError] = useState(null)
    // console.log(data);
    const { id, title, amount, date, category, description, type } = data
    
    // console.log(title, amount, date, 'aaa');
    const [inputState, setInputState] = useState({
        title: title,
        amount: amount,
        date: date,
        category: category,
        description: description
    })
    console.log(dateFormat(date));
    console.log(date);
    const handleSubmit = e => {
        e.preventDefault();
        if (type === 'income') {
            console.log(inputState);
            updateIncome(inputState, id);
        }
        else {
            updateExpense(inputState, id);
        }
        
        setInputState({
            title: inputState.title,
            amount: inputState.amount,
            date: inputState.date,
            category: inputState.category,
            description: inputState.description
        });
    };

    return (
        <PopupFormStyled onSubmit={handleSubmit}> 
            {/* {error && <p className='error'>{error}</p>} */ }
            <div className="input-control">
                <input 
                    // required
                    type="text" 
                    value={inputState.title}
                    name={'title'} 
                    placeholder="Salary Title"
                    onChange={(e) => setInputState({...inputState, title: e.target.value})}
                />
            </div>
            <div className="input-control">
                <input 
                    // required
                    value={inputState.amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Salary Amount'}
                    onChange={(e) => setInputState({...inputState, amount: e.target.value})} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    required
                    id='date'
                    type='string'
                    placeholderText='Enter A Date'
                    // selected={dateFormat(inputState.date)}
                    value={dateFormat(inputState.date)}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }} 
                />
            </div>
            <div className="selects input-control">
                <select 
                    value={inputState.category} 
                    name="category" 
                    id="category" 
                    onChange={(e) => setInputState({...inputState, category: e.target.value})}
                >
                    {type === 'income' ? (
                        <>
                            <option value="" disabled>Select Option</option>
                            <option value="salary">Salary</option>
                            <option value="freelancing">Freelancing</option>
                            <option value="investments">Investiments</option>
                            <option value="stocks">Stocks</option>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="bank">Bank Transfer</option>  
                            <option value="youtube">Youtube</option>  
                            <option value="other">Other</option>  
                        </>
                    ) : (
                        <>
                            <option value="" disabled >Select Option</option>
                            <option value="education">Education</option>
                            <option value="groceries">Groceries</option>
                            <option value="health">Health</option>
                            <option value="subscriptions">Subscriptions</option>
                            <option value="takeaways">Takeaways</option>
                            <option value="clothing">Clothing</option>  
                            <option value="travelling">Travelling</option>  
                            <option value="other">Other</option> 
                        </>
                    )}
                    
                </select>
            </div>
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={inputState.description} 
                    placeholder='Add A Reference' 
                    id="description" 
                    cols="30" rows="4" 
                    onChange={(e) => setInputState({...inputState, description: e.target.value})}>    
                </textarea>
            </div>
            <div className="submit-btn">
                {/* <button>Add Income</button> */}
                <Button 
                    name={'Edit Income'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </PopupFormStyled>
    )
}

const PopupFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input, textarea{
            width: 100%;
        }
    }
    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 1);
        }
    }
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;

export default PopupForm;