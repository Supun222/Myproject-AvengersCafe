import React from "react";
import { ACT_TYPE } from "../../../util/constans"
import { useState, useEffect } from "react/cjs/react.development";
import axios from "../../../axios"

export default function DashboardReports(reportType) {

  var defaultParameters = {
    icon: "",
    amount: "",
    name: "",
    type: ""
  }
  const [params, setParams] = useState(defaultParameters)
  const [amount, setAmount] = useState(0);


  const selectReportType = () => {
    switch (Number(reportType.reportType)) {
      case ACT_TYPE.BILLD:
        return setParams({ icon: process.env.PUBLIC_URL + `/images/order.png`, name: "Billed", amount: amount, type: "billd" });
      case ACT_TYPE.PENDING:
        coutReports(ACT_TYPE.PENDING.toString());
        return setParams({ icon: process.env.PUBLIC_URL + `/images/pending.png`, name: "Pending", amount: amount, type: "pending" });
      case ACT_TYPE.COMPLETED:
        coutReports(ACT_TYPE.COMPLETED.toString());
        return setParams({ icon: process.env.PUBLIC_URL + `/images/dispatch.png`, name: "Dispatch", amount: amount, type: "completed" });
      default:
        return setParams({ icon: process.env.PUBLIC_URL + `/images/Total.png`, name: "Total", amount: "300" });
    }
  }

  const coutReports = async (type) => {
    await axios.get("/api/order/reports/" + type)
      .then((response) => {
        setAmount(response.data)
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

  const getTotalRevenue = async () => {
    await axios.get("/api/order/reports/totalrevenue")
      .then((response) => {
        setAmount(response.data)
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
    selectReportType();
    switch (parseInt(reportType.reportType)) {
      case ACT_TYPE.BILLD:
        return coutReports("billed");
      case ACT_TYPE.PENDING:
        return coutReports("pending");
      case ACT_TYPE.COMPLETED:
        return coutReports("completed");
      default:
        return getTotalRevenue();
    }
    return () => { };
  }, []);

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-3 p-2">
      <div className="row-span-3 flex justify-center ">
        <img src={params.icon} alt="report icon" />
      </div>
      <div className="row-span-2 text-3xl font-bold font-serif col-span-2 text-center">{amount}</div>
      <div className="col-span-2 text-center text-xl font-bold">{params.name}</div>
    </div>
  );
}
