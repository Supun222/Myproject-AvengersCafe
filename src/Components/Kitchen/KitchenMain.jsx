import React from 'react'
import MainSideBarComponent from "../MainSideBar/MainSideBar"
import OrderComponent from "./util/OrderComponent"

function KitchenMainComponent(){
    return(
        <>
          <div className="w-screen h-screen bg-gray-100 flex relative">
              <MainSideBarComponent type={"Kitchen"} />
              <div className="pt-5 pl-2 pr-6">
                <OrderComponent/>
              </div>
          </div>
          <div className="row justify-content-center">
              <div className="col-3 done-btn-property">
               <button type="button" className="btn btn-primary">Done</button>
              </div>
            </div>
        </>
    )
}


export default KitchenMainComponent;