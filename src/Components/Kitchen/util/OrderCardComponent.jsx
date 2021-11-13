import React from "react";
import "./OrderStyles.css";

function OrderCardComponent (key) {
    return(
        <>
            <div key={key} className="order-panel pt-3 pl-3 pr-3">
                <div className="row justify-content-between">
                    <div className="col-4"> Client Name</div>
                    <div className="col-3"> Time</div>
                </div>
                <div className="row justify-content-between mt-2">
                    <div className="col-4"> Section No</div>
                    <div className="col-3"> Table No</div>
                </div>
                <div className="row justify-content-center mt-2 not-selected-card-label">
                    <div className="col-6 text-align-center">New Items</div>
                </div>
                <div className="row mt-4 justify-content-center">
                    <div className="col-2"> 1</div>
                    <div className="col-6"> Food Name</div>
                </div>
                <div className="row prep-time-label not-selected-card-label">
                    <div className="col-12 text-align-center">Time (prep Time)</div>
                </div>
            </div>
            
        </>
    )
}

export default OrderCardComponent;