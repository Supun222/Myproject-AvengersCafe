import React, { useState } from "react";
import MainSideBarComponent from "../MainSideBar/MainSideBar";
import DashboardReports from "./Util/DashboardReports";
import CustomerOrderTable from "./Util/CustomerOrder";
import FoodOrderComponent from "./Util/FoodOrder";
import { ACT_TYPE } from "../../util/constans";
import { useParams } from "react-router-dom";


function DashboardMainComponent() {

  const [activeTable, setActiveTable] = useState(false);
  const { userType } = useParams();

  return (
    <div className="w-screen h-screen bg-gray-100 flex relative">
      <MainSideBarComponent type={"Dashboard"} />
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
        <div className="row justify-content-between">
          <div className="col-2 font-black pt-3 pb-3 text-xl">Orders</div>
          {(!activeTable) ? 
            <label className="col-2 pt-3 pb-3"> Table : 1</label> : null
          }
        </div>
        <div className="row">
          <CustomerOrderTable />
        </div>
        <div className="row">
          {
            !activeTable ?
              <FoodOrderComponent />
              : null
          }
        </div>

        {
          (!activeTable && userType !== "manager") ?
            <div className="row justify-content-end ">
              <div className="col-3 text-center">
                <button className="mr-2 btn btn-success">Cancel</button>
              </div>
              <div className="col-3 text-center">
                <button className="btn btn-warn">Proceed</button>
              </div>
            </div> : null
        }

      </div>
    </div>
  );
}

export default DashboardMainComponent;
