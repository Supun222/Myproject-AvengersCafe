import React from 'react'

function FoodComponent({image, name, price}) {
    return (
        <div className="bg-white w-64 h-80 rounded-lg flex flex-col items-center p-6 cursor-pointer">
            <div className="rounded-full h-48 w-36 bg-yellow-mid flex items-center justify-center">
                <img src={image} alt="Food" />
            </div>
            <h1 className="text-3xl my-5 text-center">{name}</h1>
            <h2 className="text-2xl font-semibold">${price}</h2>
        </div>
    )
}

export default FoodComponent
