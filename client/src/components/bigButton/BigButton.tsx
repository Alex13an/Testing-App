import React, { FC, useState } from 'react'
import './bigButton.scss'
import { LoadingOutlined } from '@ant-design/icons'

interface BigButtonProps {
  click: () => void
  disabled?: boolean
  children: React.ReactNode
}

const BigButton: FC<BigButtonProps> = ({ click, disabled, children }) => {
  const [clicked, setClicked] = useState<boolean>(false)

  const clickHandle = () => {
    if (clicked) return
    click()
    setClicked(true)
  }

  return (
    <button
      className={`big-button ${(disabled || clicked) && 'big-button_disabled'}`}
      onClick={clickHandle}
    >
      {children}
      {clicked && (
        <span>
          {' '}
          <LoadingOutlined />
        </span>
      )}
    </button>
  )
}

export default BigButton
