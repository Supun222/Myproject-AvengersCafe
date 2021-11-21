import React from "react";
import "./OrderStyles.css";
import Slider from "react-slick";
import OrderCardComponent from "./OrderCardComponent";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "../../../axios";

function OrderComponent() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const getAllOrders = async () => {
    await axios
      .get("/api/order/cofirmorder")
      .then((response) => {
        response.data.map((data) => {
          return setOrdersList((previousOrder) => [...previousOrder, data]);
        });
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
  };

  useEffect(() => {
    setOrdersList([]) //* First empty the array
    getAllOrders(); //* Then loads data
    console.log(ordersList.length);
  }, []);

  const updateOrderCompleted = async (cusId) => {
    await axios.put("/order/chefconfirm/" + cusId)
      .then((response) => {
        setSelectedCustomerId("");
        setOrdersList((data) => {
          let index = data.findIndex(Obj => Obj.cusID === cusId);
          return (ordersList.splice(index, 1))
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
  return (
    <>
      <div style={{ maxWidth: "90vw" }}>
        <Slider {...settings}>
          {ordersList.map((data, index) => {
            return (
              <button
                onClick={() => {
                  setSelectedCustomerId(data.cusID);
                }}
              >
                <OrderCardComponent
                  key={index}
                  userData={data}
                  selectedCustomerId={selectedCustomerId}
                />
              </button>
            );
          })}
        </Slider>
      </div>
      <div className="row justify-content-center">
        <div className="col-3 done-btn-property">
          <button type="button" className="btn btn-primary" disabled={(selectedCustomerId === "" || selectedCustomerId === undefined)} onClick={() => {
            updateOrderCompleted(selectedCustomerId)
          }}>
            Done
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderComponent;
