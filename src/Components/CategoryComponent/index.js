import React from 'react'

function CategoryComponent({active, icon, title}) {
    return (
        <div className={`cursor-pointer w-44 h-56 flex flex-col items-center justify-center rounded-3xl ${active ? 'bg-yellow-light' : 'bg-gray-50'}`}>
            <div className={`w-28 h-28 flex items-center justify-center rounded-3xl ${active ? 'bg-white' : 'bg-gray-300'}`}>
                <img src={icon} alt="Icon" />
            </div>
            <p className="text-center text-2xl font-semibold text-gray-500 mt-3">{title}</p>
        </div>
    )
}

export default CategoryComponent
