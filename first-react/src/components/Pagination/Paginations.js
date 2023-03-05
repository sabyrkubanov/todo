
import React from 'react'
import classes from './paginations.module.css';
const Paginations = ({  page, handleNext, handlePrev}) => {
    return (
        <div className={classes.pagination}>
            <div className={classes.paginationBlock}>
                <button onClick={handlePrev}>Prev</button>
                <h5>{page}</h5>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}

export default Paginations
