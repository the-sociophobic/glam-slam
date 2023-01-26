import React from 'react'

import { Context } from './Store'
import Game from './Game'
import Header from './Header'
import Footer from './Footer'


const Site: React.FC = () => {
  const { ready } = React.useContext(Context)

  return ready ?
    <div className="App">
      <Header />
      <Game />
      <Footer />
    </div>
    :
    <div />
}


export default Site
