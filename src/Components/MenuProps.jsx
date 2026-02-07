import React from 'react'

function MenuProps({ Menu, isActive }) {
    return (
        <div>
            <li className={`font-medium text-[12px] sm:text-[15px] transition-colors duration-300 ${
                isActive ? 'text-blue-300' : 'text-white hover:text-blue-300'
            }`}>
                {Menu}
            </li>
        </div>
    )
}

export default MenuProps
