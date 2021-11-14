import React from 'react'
import MainSideBarComponent from "../MainSideBar/MainSideBar"
import OrderComponent from "./util/OrderComponent"

function KitchenMainComponent(){
    return(
        <>
          <div className="w-screen h-screen bg-gray-100 flex relative">
              <MainSideBarComponent type={"Kitchen"} />
              <div className="pt-5 pl-2 pr-6 w-screen">
                <OrderComponent/>
              </div>
          </div>
        </>
    )
}


export default KitchenMainComponent;