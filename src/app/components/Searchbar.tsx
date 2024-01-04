import React from 'react'

import SearchbarStyle from './searchbarStyle.module.css'

export default function Searchbar() {
  return (
    <input type="text" className={SearchbarStyle.searchbar}/>
  )
}
