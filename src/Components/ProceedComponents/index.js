import React, { useContext, useState } from 'react'
import { OpenContext } from '../Dashboard/OpenManager'
import axios from '../../axios';
import { FetchContext } from '../Dashboard/ContextManager';
import {Redirect} from "react-router-dom"

function Proceeds({userType}) {

    const {openTable, setOpenTable} = useContext(OpenContext);
    const {id} = useContext(FetchContext);
    const [redirect, setRedirect] = useState(false);
    const [customError, setCustomError] = useState(false)

    async function UpdateHandler() {
        await axios.put(`/order/chefconfirm/${id}`, {
            
        })
            .then(response => {
                setRedirect(true);
            })
            .catch(function (error) {
                if (error.response) {
                    setCustomError("Can't complete order");
                } else if (error.request) {
                    setCustomError('Internal Server Error');
                } else {
                    setCustomError("Can't complete order");
                }
            })
    }
    
    if(redirect) {
        return (
            <Redirect to="/dashboard/cashier" />
        )
    }

    if(!openTable) {
        return null;
    }


    return (
        <>
            <div className="col-3 text-center">
              <button className="mr-2 btn btn-success" onClick={() => setOpenTable(false)}>Cancel</button>
            </div>
            {
                userType !== "manager" ? 
                <div className="col-3 text-center">
                    <button className="btn btn-warn rounded-md bg-red-500 px-3 py-2 text-white" onClick={() => {UpdateHandler()}}>Proceed</button>
                </div> : null
            }
        </>
            
    )
}

export default Proceeds
