import React, { FC } from 'react'
import './bigButton.scss'

interface BigButtonProps {
  click: () => void
  disabled?: boolean
  children: React.ReactNode
}

const BigButton: FC<BigButtonProps> = ({ click, disabled, children }) => {
  return (
    <button className={`big-button ${disabled && 'big-button_disabled'}`} onClick={click}>
      {children}
    </button>
  )
}

export default BigButton
