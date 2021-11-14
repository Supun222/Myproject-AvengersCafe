import React from "react";
import { ACT_TYPE } from "../../../util/constans"
import { useState, useEffect } from "react/cjs/react.development";
import axios from "../../../axios"

export default function DashboardReports(reportType) {

    var defaultParameters = {
        icon: "",
        amount: "",
        name: ""
    }
    const [params, setParams] = useState(defaultParameters)


    const selectReportType = () => {
        switch (Number(reportType.reportType)) {
            case ACT_TYPE.BILLD:
                return setParams({ icon: process.env.PUBLIC_URL + `/images/order.png`, name: "Billd", amount: "0" });
            case ACT_TYPE.PENDING:
                return setParams({ icon: process.env.PUBLIC_URL + `/images/pending.png`, name: "Pending", amount: "500" });
            case ACT_TYPE.COMPLETED:
                return setParams({ icon: process.env.PUBLIC_URL + `/images/dispatch.png`, name: "Dispatch", amount: "300" });
            default:
                return setParams({ icon: process.env.PUBLIC_URL + `/images/Total.png`, name: "Total", amount: "300" });
        }
    }

    useEffect(() => {
        selectReportType()
        console.log(params)
        return () => { };
    }, []);

    return (
        <div className="grid grid-rows-3 grid-flow-col gap-3 p-2">
            <div className="row-span-3 flex justify-center ">
                <img src={params.icon} alt="report icon" />
            </div>
            <div className="row-span-2 text-3xl font-bold font-serif col-span-2 text-center">{params.amount}</div>
            <div className="col-span-2 text-center text-xl font-bold">{params.name}</div>
        </div>
    );
}
