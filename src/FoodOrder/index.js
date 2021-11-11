import React from 'react'
import FoodComponent from '../Components/FoodComponent'
import IconButton from '../Components/IconButton'
import {HomeIcon, LockClosedIcon} from "@heroicons/react/solid"
import {ChatIcon, CogIcon, XIcon} from "@heroicons/react/outline"
import CartItem from '../Components/CartItem'
import "./style.css"
import CategoryComponent from '../Components/CategoryComponent'
import { useState } from 'react/cjs/react.development'

const DATA = [
    {   
        id: 1,
        image: process.env.PUBLIC_URL + `/images/item.png`,
        name: "Bell Pepper Pizza",
        price: "12.99"
    },
    {
        id: 2,
        image: process.env.PUBLIC_URL + `/images/item.png`,
        name: "Bell Pepper Pizza",
        price: "12.99"
    },
    {
        id: 3,
        image: process.env.PUBLIC_URL + `/images/item.png`,
        name: "Bell Pepper Pizza",
        price: "12.99"
    },
    {
        id: 4,
        image: process.env.PUBLIC_URL + `/images/item.png`,
        name: "Bell Pepper Pizza",
        price: "12.99"
    },
]

const CATEGORY_DATA = [
    {
        id: 1,
        title: "pizza",
        icon: process.env.PUBLIC_URL + `/images/pizza.png`
    },
    {
        id: 2,
        title: "burger",
        icon: process.env.PUBLIC_URL + `/images/burger.png`
    },
    {
        id: 3,
        title: "rice",
        icon: process.env.PUBLIC_URL + `/images/rice.png`
    },
    {
        id: 4,
        title: "hot",
        icon: process.env.PUBLIC_URL + `/images/pizza.png`
    },
    {
        id: 5,
        title: "devilled",
        icon: process.env.PUBLIC_URL + `/images/rice.png`
    },
]

const CART_COUNT = 1;

function FoodOrder() {
    
    const homeIcon = <HomeIcon className="w-14 h-14 text-white block"/>
    const chatIcon = <ChatIcon className="w-14 h-14 text-gray-500 block"/>
    const cogIcon = <CogIcon className="w-14 h-14 text-gray-500 block"/>
    const closeIcon = <XIcon className="w-14 h-14 text-gray-500 block"/>

    const [picked, setPicked] = useState(false);

    return (
        <div className="w-screen h-screen bg-gray-100 flex relative">
            <div className="w-1/12 flex flex-col items-center relative justify-between pb-10">
                <div className="flex flex-col h-3/5 justify-around items-center">
                    <img src={process.env.PUBLIC_URL + `/images/logo.png`} alt="LOGO" className="logo" />
                    <IconButton icon={homeIcon} name={"Home"} active={true}/>
                    <IconButton icon={chatIcon} name={"Chat"} active={false}/>
                    <IconButton icon={cogIcon} name={"Settings"} active={false}/>
                </div>
                <IconButton icon={closeIcon} name={"Close"} active={false}/>
            </div>
            <div className="flex-1 py-6 px-5">
                <div className="mb-5">
                    <h1 className="text-4xl font-semibold text-gray-500">Menu Category</h1>
                    <div className="flex justify-between mt-10">
                        {
                            CATEGORY_DATA.map(element => (
                                <CategoryComponent key={element.id} active={true} icon={element.icon} title={element.title} />
                            ))
                        }
                    </div>
                    <h1 className="text-4xl font-semibold text-gray-500 my-6">Pick Your Favourite</h1>
                </div>
                <div className="flex-1 grid grid-cols-4 py-10 relative">
                    <div className={`absolute z-30 top-0 right-0 left-0 bottom-0 w-full h-full glass ${picked ? 'block' : 'hidden'}`}></div>
                    {
                        DATA.map((element) => (<FoodComponent key={element.id} image={element.image} name={element.name} price={element.price}/>))
                    }
                </div>
            </div>
            <div className="w-1/4 px-4 py-10 relative">
                <h1 className="text-4xl font-semibold mb-10">Order Menu</h1>
                {
                    CART_COUNT === 0 
                    ? 
                        <div className="flex items-start justify-center">
                            <p className="text-center text-2xl bg-gray-300 px-8 py-4 rounded-full">
                                No Items
                            </p>
                        </div>
                    :
                        <div>
                            <div>
                                <CartItem 
                                    image={DATA[0].image}
                                    name={DATA[0].name}
                                    quantity={10}
                                    price={DATA[0].price}
                                />
                                <CartItem 
                                    image={DATA[0].image}
                                    name={DATA[0].name}
                                    quantity={10}
                                    price={DATA[0].price}
                                />
                            </div>
                            <div className="w-11/12 h-1 border-2 border-dashed border-gray-400 mx-auto" />
                            <div className="px-3 mt-6">
                                <div className="flex text-2xl font-semibold text-gray-600">
                                    <p className="flex-1">Sub Total</p>
                                    <p>$89.99</p>
                                </div>
                                <div className="flex text-2xl font-semibold text-gray-600 mt-2">
                                    <p className="flex-1">Discount(10%)</p>
                                    <p>$8.99</p>
                                </div>
                            </div>
                        </div>
                }
                <div className={`${CART_COUNT === 0 ? 'opacity-60' : 'opacity-100'} w-3/5 absolute bottom-10 left-1/2 transform -translate-x-1/2 px-10 py-5 bg-pink text-white rounded-full flex items-center justify-center cursor-pointer`}>
                    <p className="text-3xl font-semibold mr-3">Order</p>
                    {
                        CART_COUNT === 0
                        ?
                        <LockClosedIcon className="w-10 h-10 text-gray-50 block" />
                        :
                        <p className="text-3xl font-semibold">${89.99 - 8.99}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default FoodOrder
