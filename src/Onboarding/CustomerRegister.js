import React, {useState} from 'react'
import axios from '../axios';
import "./styles.css"
import {Redirect} from "react-router-dom"

function CustomerRegister() {

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [NIC, setNIC] = useState("");
    const [address, setAddress] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [customError, setCustomError] = useState();
    const date = new Date().getDate().toString()
    async function PostHandler(){
        await axios.post("/customer/save", {
            address: address,
            date: date,
            name: name,
            nic : NIC, 
            phone : mobile
            
        }).then(response => {
            setRedirect(true);
            localStorage.setItem("cus_id", response.data);
        }).catch(function (error) {
            if(error.response){
                setCustomError("Can't send customer information");
            } else if(error.request){
                setCustomError("Internal Server Error");
                console.log(error);
            } else {
                setCustomError("Can't send customer information");
            }
        })
    }

    if(redirect){
        return (
            <Redirect to="/order"/>
        )
    } else if(customError !== undefined) {
        return (
            <div className='w-screen h-screen flex items-center justify-center text-7xl tracking-widest font-light uppercase text-gray-400'>
                {customError}
            </div>
        );
    }

    return (
        <div className='h-screen flex w-screen justify-end bg-gray-100 overflow-hidden relative'>
            <div className="ml-16">
                <svg width="982" height="1200" viewBox="0 0 982 1200" fill="none" className="customer-shape">
                    <path d="M915 1206C915 1206 756 951 772 724C788 497 1002 561 980 228C980 228 967 62 899 2H0V1201L915 1206Z" fill="#FFDB6D"/>
                    <path d="M898 1203C898 1203 739 948 755 721C771 494 985 558 963 225C963 225 950 59 882 -1L0 2V1201L898 1203Z" fill="#F9F9F9"/>
                </svg>
                <div className="absolute left-24 top-20">
                    <h1 className="text-yellow-light text-3xl text-logo font-semibold">Avengers cafe</h1>
                    <div className="mt-10">
                        <h2 className="text-4xl font-semibold">Welcome Back!</h2>
                        <h3 className="text-2xl">We need your information for your own safety.</h3>
                    </div>
                    <div className=" ml-12 mt-12≈">
                    <div className="flex flex-col w-24 min-w-full items-start mt-2">
                        <label name="">Name</label>
                        <input type="text" className="bg-white px-3 py-3 rounded-md mt-3 w-24 min-w-full" name="Name" id="Name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="flex flex-col items-start mt-2">
                        <label name="">Mobile</label>
                        <input type="text" className="bg-white px-3 py-3 rounded-md mt-3 w-24 min-w-full" name="Mobile" id="Mobile" placeholder="Enter your mobile number" maxLength="10" onChange={(e) => setMobile(e.target.value)}/>
                    </div>
                    <div className="flex flex-col items-start mt-2">
                        <label name="">NIC</label>
                        <input type="text" className="bg-white px-3 py-3 rounded-md mt-3 w-24 min-w-full" name="NIC" id="NIC" placeholder="Enter your NIC number" onChange={(e) => setNIC(e.target.value)}/>
                    </div>
                    <div className="flex flex-col items-start mt-2">
                        <label name="Address">Address</label>
                        <textarea name="Address" className="bg-white px-3 py-3 rounded-md mt-3 w-24 min-w-full" id="Address" placeholder="Enter your address" onChange={(e) => setAddress(e.target.value)}></textarea>
                    </div>
                    <button id="" className="bg-yellow-light px-7 py-4 rounded-md mt-10 w-24 min-w-full" onClick={PostHandler}>
                            Get Started
                    </button>
                    </div>
                </div>
            </div>
            <div className="h-screen flex justify-end bg-blue-400">
                <img src={process.env.PUBLIC_URL + `images/one.png`} alt="" className="w-full h-full object-contain" />
            </div>
        </div>
    )
}

export default CustomerRegister;