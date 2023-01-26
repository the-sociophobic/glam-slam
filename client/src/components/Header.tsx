import React from 'react'


export type HeaderPropsType = {}


const Header: React.FC<HeaderPropsType> = () =>
  <div className='Header'>
    <div className='container'>
      <div className='d-flex flex-row justify-content-between'>
        <h2 className='h2'>
          GlamSlam x Osipov
        </h2>
        <h2 className='h2'>
          menu
        </h2>
      </div>
    </div>
  </div>


export default Header