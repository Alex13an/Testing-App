import React, { FC, useState } from 'react'
import styles from './ClickCounter.module.scss'

const ClickCounter: FC = () => {
  const [clicks, setClicks] = useState<number>(0)
  console.log(styles.shmutton)
  return (
    <div>
      <p className={styles.shmutton}>Button-Shmutton</p>
      <button onClick={() => setClicks((c) => c + 1)}>Clicks: {clicks}</button>
    </div>
  )
}

export default ClickCounter
