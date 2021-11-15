import React, { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { FetchContext } from "../ContextManager";
import axios from "../../../axios";
import "./utilStyle.css";
import { OpenContext } from "../OpenManager";
import { TotalContext } from "../TotalContext";

export default function FoodOrderComponent() {

  const { id } = useContext(FetchContext);
  const { openTable } = useContext(OpenContext);
  const { total } = useContext(TotalContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customError, setCustomError] = useState(false);
  // const [total, setTotal] = useState(0);

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

  if (!openTable) {
    return null;
  }

  return (
    <div>
      <table className="table table-hover">
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
              <tr key={index} className="bg-white border pt-5 text-xl">
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
      <div className="row justify-content-end text-2xl mt-10">
        <label className="col-2 text-center">Total (10% Discount)</label>
        <label className="col-4 text-center">${total}.00</label>
      </div>
    </div>
  );
}
