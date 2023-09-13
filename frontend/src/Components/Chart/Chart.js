import React, {useContext} from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { GlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const {incomes, expenses} = useContext(GlobalContext);
    
    const data = {
        labels: incomes.sort((a, b) => new Date(a.date) - new Date(b.date)).map((inc) =>{
            const {date} = inc;
            // console.log(typeof(date), date);
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }


    return (
        <ChartStyled >
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 0rem;
    border-radius: 20px;
    height: 190%;
    
`;

export default Chart