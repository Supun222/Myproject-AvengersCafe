import React, { useEffect, useState } from "react";
import "./utilStyle.css";
import axios from "../../../axios";

export default function CustomerOrderTable() {

  const [dailyOrders, setDailyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState(false)

  useEffect(() => {
    async function fetchOrders() {
      await axios.get('/dashboard/dailyorders').then(response => {
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

  function showSelected(data) {

  }

  return (
    <div className="">
      <table className="table table-hover">
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
            dailyOrders.map((item, index) =>
              <tr key={item.tableNum}>
                <td>{index + 1}</td>
                <td>{item.cusName}</td>
                <td>{item.tableNum}</td>
                <td>{item.actType}</td>
                <td>Rs.{item.totalPrice}.00</td>
                <td>
                  <button className="px-3 py-2 bg-green-500 rounded-md text-white">View</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}
