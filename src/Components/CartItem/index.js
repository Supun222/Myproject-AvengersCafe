import React from 'react'
import "../FoodComponent/styles.css"

function CartItem({image, name, quantity, price}) {
    return (
        <div className="flex items-center mb-5">
            <div className="w-36 h-36 bg-yellow-mid rounded-full flex items-center justify-center">
                <img className="category-image" src={image} alt="Item" />
            </div>
            <div className="flex flex-1 flex-col px-3 justify-between">
                <h3 className="text-2xl font-semibold text-gray-500">{name}</h3>
                <p className="text-gray-400 text-xl">${price}</p>
            </div>
            <p className="px-3 text-xl text-gray-500">x{quantity}</p>
            <p className="text-xl text-gray-500">${price * quantity}</p>
        </div>
    )
}

export default CartItem
