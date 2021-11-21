import React, { useContext, useState } from 'react'
import { OpenContext } from '../Dashboard/OpenManager'
import axios from '../../axios';
import { FetchContext } from '../Dashboard/ContextManager';

function Proceeds({userType}) {

    const {openTable, setOpenTable} = useContext(OpenContext);
    const {id} = useContext(FetchContext);
    const [redirect, setRedirect] = useState(false);
    const [customError, setCustomError] = useState(false)

    async function UpdateHandler() {
        await axios.put(`/order/cashierconfirm/${id}`, {
            
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
        window.location.reload();
    }

    else if(!openTable) {
        return null;
    }


    return (
        <>
            <div className="text-center text-xl">
              <button className="mr-2 btn btn-success rounded-md bg-green-500 px-4 py-3 text-white" onClick={() => setOpenTable(false)}>Cancel</button>
            </div>
            {
                userType !== "manager" ? 
                <div className="text-center text-xl">
                    <button className="btn btn-warn rounded-md bg-red-500 px-4 py-3 text-white" onClick={() => {UpdateHandler()}}>Proceed</button>
                </div> : null
            }
        </>
            
    )
}

export default Proceeds
