import React from 'react'

const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all ${className}`}>
      {children}
    </button>
  )
}

export default Button
