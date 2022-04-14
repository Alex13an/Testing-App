import React from 'react'
import './loader.scss'
import { Spin } from 'antd'

const Loader = () => {
  return (
    <div className="loader">
      <Spin />
    </div>
  )
}

export default Loader
