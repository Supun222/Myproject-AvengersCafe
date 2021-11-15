import React, { createContext, useContext, useEffect, useState } from "react";
import "./utilStyle.css";
import axios from "../../../axios";
import { FetchContext } from "../ContextManager";
import { OpenContext } from "../OpenManager";
import { TotalContext } from "../TotalContext";

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


  const { openTable, setOpenTable } = useContext(OpenContext);
  const { setTotal } = useContext(TotalContext);

  const ItemViewHandler = (ItemID, total) => {
    setId(ItemID);
    setTotal(total);
    setOpenTable(true);
  }

  const Orders = dailyOrders.map((item, index) =>
    <tr key={item.cusId} className="bg-white border pt-5">
      <td>{index + 1}</td>
      <td>{item.cname}</td>
      <td>{item.tableNum}</td>
      <td>{item.actType}</td>
      <td>Rs.{item.totalPrice}.00</td>
      <td>
        {/* <button className="px-3 py-2 bg-green-500 rounded-md text-white" onClick={() => setId(item.cusId)}>View</button> */}
        <button className="px-3 py-2 bg-green-500 rounded-md text-white" onClick={() => ItemViewHandler(item.cusId, item.totalPrice)}>View</button>
      </td>
    </tr>
  );

  if (openTable) {
    return null;
  }

  return (
    <div className="">
      <table className="table table-hover text-xl">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Customer</th>
            <th scope="col">Table No</th>
            <th scope="col">Status</th>
            <th scope="col">Total (10% Discount)</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {
            Orders
          }
        </tbody>
      </table>
    </div>
  );
}
