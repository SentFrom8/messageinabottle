import React from 'react'
import SeaStyle from '../styles/SeaStyle.module.css'
import { Bottle } from './Bottle'

export const Sea = () => {
  return (
    <div className={SeaStyle.sea}>
        <Bottle/>
    </div>
  )
}
