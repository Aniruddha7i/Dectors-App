import React from 'react'

const Button = ({ text, OnclickF }) => {
    return (
        <div className='flex items-center'>
            <button onClick={OnclickF} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
                {text}
            </button>
        </div>
    )
}

export default Button