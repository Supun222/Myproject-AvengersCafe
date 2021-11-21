import React, { useState, useContext } from "react";
import MainSideBarComponent from "../MainSideBar/MainSideBar";
import DashboardReports from "./Util/DashboardReports";
import CustomerOrderTable from "./Util/CustomerOrder";
import FoodOrderComponent from "./Util/FoodOrder";
import { ACT_TYPE } from "../../util/constans";
import { FetchContext } from "./ContextManager";
import { OpenContext } from "./OpenManager"
import { useParams } from "react-router-dom";
import Proceeds from "../ProceedComponents";
import { TotalContext } from "./TotalContext";


function DashboardMainComponent() {

  const [id, setId] = useState(0);
  const [total, setTotal] = useState(0);
  const [openTable, setOpenTable] = useState(false);
  const { userType } = useParams();

  return (
    <div className="w-screen h-screen bg-gray-100 flex relative">
      <MainSideBarComponent type={"Dashboard"} />
      <OpenContext.Provider value={{ openTable, setOpenTable }}>
        <div className="box-border  bg-red-100 h-90 w-screen p-12 m-12 rounded-3xl">
          <div className="font-black pb-3 text-xl">Live Orders</div>
          <div className="row">
            <div className="col h-32 w-32 rounded-2xl bg-white m-1">
              <DashboardReports reportType={ACT_TYPE.BILLD} />
            </div>
            <div className="col h-32 w-32 rounded-2xl bg-white m-1">
              <DashboardReports reportType={ACT_TYPE.PENDING} />
            </div>
            <div className="col h-32 w-32 rounded-2xl bg-white m-1">
              <DashboardReports reportType={ACT_TYPE.COMPLETED} />
            </div>
            <div className="col h-32 w-32 rounded-2xl bg-white m-1">
              <DashboardReports />
            </div>
          </div>
          <div className="row justify-content-between mt-12">
            <div className="col-2 font-black pt-3 pb-3 text-xl">Orders</div>
            {/* <label className="col-2 pt-3 pb-3"> Table : 1</label> */}
          </div>
          <FetchContext.Provider value={{ id, setId }}>

            <TotalContext.Provider value={{ total, setTotal }}>


              <div className="row">
                <CustomerOrderTable />
              </div>
              <div className="row">
                <FoodOrderComponent />
              </div>

            </TotalContext.Provider>

            <div className="justify-content-end mt-6 flex items-center">
              <Proceeds userType={userType} />
            </div>

          </FetchContext.Provider>

        </div>
      </OpenContext.Provider>
    </div>
  );
}

export default DashboardMainComponent;
