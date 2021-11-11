import React from 'react'

function IconButton({icon, name, active}) {
    return (
        <div className={`${active ? 'bg-pink' : 'bg-gray-100'} w-24 h-24 rounded-md flex flex-col items-center justify-center cursor-pointer`}>
            {icon}
            <p className={`${active ? 'text-white' : 'text-gray-500'}`}>{name}</p>
        </div>
    )
}

export default IconButton
