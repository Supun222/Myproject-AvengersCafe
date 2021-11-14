import React, { createContext, useContext, useEffect, useState } from "react";
import "./utilStyle.css";
import axios from "../../../axios";
import { FetchContext } from "../ContextManager";

export default function CustomerOrderTable() {

  const [dailyOrders, setDailyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState(false)
  const { id, setId } = useContext(FetchContext);

  useEffect(() => {
    async function fetchOrders() {
      await axios.get('/api/order/checkorder').then(response => {
        setDailyOrders(response.data);
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
  }, []);

  const Orders = dailyOrders.map((item, index) =>
    <tr key={item.cusId}>
      <td>{index + 1}</td>
      <td>{item.cname}</td>
      <td>{item.tableNum}</td>
      <td>{item.actType}</td>
      <td>Rs.{item.totalPrice}.00 - {id}</td>
      <td>
        <button className="px-3 py-2 bg-green-500 rounded-md text-white" onClick={() => setId(item.cusId)}>View</button>
      </td>
    </tr>
  );

  return (
    <div className="">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Customer</th>
            <th scope="col">Table No</th>
            <th scope="col">Status</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-body-fixed-height">
          {
            Orders
          }
        </tbody>
      </table>
    </div>
  );
}
