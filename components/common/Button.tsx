'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'link'
  animate?: boolean
}

/**
 * Reusable button component with different variants
 */
const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  animate = false, 
  ...props 
}) => {
  // Base classes for all buttons
  const baseClasses = 'btn font-bold'

  // Variant-specific classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary:
      'bg-white text-accent border-3 border-base px-6 py-3 shadow-brutal hover:translate-y-1 hover:translate-x-1 hover:shadow-none active:translate-y-1 active:translate-x-1 active:shadow-none transition-all',
    link: 'inline-block bg-white text-base border-3 border-base px-6 py-3 shadow-brutal hover:translate-y-1 hover:translate-x-1 hover:shadow-none active:translate-y-1 active:translate-x-1 active:shadow-none transition-all',
  }

  // Animation classes
  const animationClass = ''

  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${animationClass} ${className}`

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

export default Button