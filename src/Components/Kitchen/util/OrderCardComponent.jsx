import React from "react";
import "./OrderStyles.css";
import axios from "../../../axios";
import { useState, useEffect } from "react/cjs/react.development";

function OrderCardComponent({ key, userData, selectedCustomerId }) {

  const [foodOrderInfo, setFoodOrderInfo] = useState([]);
  const [prepTime, setPrepTime] = useState(0);

  const calculatePrepTime = (foodDetails) => {
    setPrepTime(prev => { return (prev + (foodDetails.prepTime * foodDetails.quantity)) })
  }

  const getOrderDetails = async () => {

    await axios.get("/api/order/singleorder/" + userData.cusID)
      .then((response) => {
        // console.log(response)
        response.data.map((data) => {
          return (
            setFoodOrderInfo((previousOrder) => [...previousOrder, data]),
            calculatePrepTime(data)
          )
        })
      })
      .catch(function (error) {
        if (error.response) {
          console.error(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error);
        }
      });
  }


  useEffect(() => {
    setFoodOrderInfo([]);
    getOrderDetails();
  }, []);

  return (
    <>
      <div key={key} className="order-panel pt-3 pl-3 pr-3">
        <div className="row justify-content-between">
          <div className="col-4"> ID : {userData.cusID}</div>
          <div className="col-3"> Table No : {userData.tableNum}</div>
        </div>
        <div className="row justify-content-between mt-2">
          <div className="col-5"> Section No : 1</div>
        </div>
        <div className="row justify-content-center mt-2 not-selected-card-label">
          <div className="col-6 text-align-center">New Items</div>
        </div>
        <div className="h-3/5 overflow-auto">
          {foodOrderInfo.map((data) => {
            return (
              <div className="row mt-4 justify-content-center">
                <div className="col-2"> {data.quantity}</div>
                <div className="col-6"> {data.fname}</div>
              </div>
            )
          })}

        </div>
        <div className={`row prep-time-label ${selectedCustomerId === userData.cusID ? "selected-card-label" : "not-selected-card-label"}`}>
          <div className="col-12 text-align-center">Preparation Time : {prepTime} min</div>
        </div>
      </div>
    </>
  );
}

export default OrderCardComponent;
