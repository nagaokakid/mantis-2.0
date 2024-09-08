import React from 'react'

interface ButtonProps
{
    label: string,
    className: string,
    onClick: () => void
}

const Button: React.FC<ButtonProps> = ({label, className, onClick}) => (
  <div>
    <button onClick={onClick} className={`bg-green-600 hover:bg-green-500 text-white text-center 
      py-4 px-6 w-fit rounded focus:outline-none focus:shadow-outline ${className}`}>
      {label}
    </button>
  </div>
)

export default Button