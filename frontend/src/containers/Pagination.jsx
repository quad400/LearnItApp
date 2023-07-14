import React from 'react'
import { Pagination } from 'antd'

const Pagination = ({current, counts}) => {

    function handlePrev() {

    }

    function handleNext() {

    }

    function selectById(e) {
        
    }
  return (
    <nav>
        <ul>
            <li>
                <a href="#" onClick={()=> handlePrev()}>Prev</a>
            </li>
            {
                counts.map((n, i)=> (
                    <li>
                        <a href="#" onClick={()=> selectById(n)}>{n}</a>
                    </li>
                ))
            }
            <li>
                <a href="#" onClick={()=> handleNext()}>Next</a>
            </li>
        </ul>
    </nav>
  )
}

export default Pagination