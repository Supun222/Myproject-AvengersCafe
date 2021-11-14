import React, { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { FetchContext } from "../ContextManager";
import axios from "../../../axios";
import "./utilStyle.css";

export default function FoodOrderComponent() {

  const { id } = useContext(FetchContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customError, setCustomError] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      await axios.get(`/api/order/singleorder/${id}`).then(response => {
        setOrderDetails(response.data);
        if (response.data.length !== 0) {
          setLoading(false);
        } else {
          setCustomError('No Orders');
        }
        return response;
      }).catch(function (error) {
        if (error.response) {
          setCustomError('No Orders');
        } else if (error.request) {
          setCustomError('Internal Server Error');
        } else {
          setCustomError("Can't Load Orders");
        }
      });
    }
    fetchOrders();


  }, [id]);


  return (
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Item No</th>
            <th scope="col">Food Items</th>
            <th scope="col">QTY</th>
            <th scope="col">Unit price</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody className="table-body-fixed-height">
          {
            orderDetails.map((item, index) =>
              <tr>
                <td>{index + 1}</td>
                <td>{item.fname}</td>
                <td>{item.quantity}</td>
                <td>${item.price}.00</td>
                <td>${item.price * item.quantity}.00</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <div className="row justify-content-end">
        <label className="col-2 text-center">Total</label>
        <label className="col-4 text-center">${total}</label>
      </div>
    </div>
  );
}
