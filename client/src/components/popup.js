import React from 'react';
import { useContext } from 'react';
import "./popup.css"
import { AppContext } from '../helpers/context';

//popup component related to the userCourseCard.js and activated when the user click on "leave" button
const Popup = (props) => {
    const {deleteCourse}=props
    const {visability,setVisability}=useContext(AppContext)
    return (
        <div style= {{ display: visability ? 'inline-block' : 'none' }} className="modal-wrapper" id="modal">
        <div className="modal-body card">
            <div className="modal-header">
                <h2 className="heading">Are you sure you want to leave?</h2>
                <a onClick={()=>{setVisability(false)}} role="button" className="close" aria-label="close this modal">
                    <svg viewBox="0 0 24 24">
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                    </svg>
                </a>
            </div>
            <h3>By Click on Confirm, you will leave the course without any refund!</h3>
            <button onClick={()=>{deleteCourse()}} className="confirm-btn">Confirm</button>
        </div>
        <a href="#!" className="outside-trigger"></a>
    </div>
    );
}

export default Popup;
