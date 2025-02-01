import React from 'react'

const Card = ({ children, className }) => {
  return (
    <div className={`p-4 bg-white shadow-md rounded-md ${className}`}>
      {children}
    </div>
  )
}

export default Card
