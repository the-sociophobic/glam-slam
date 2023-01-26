import React from 'react'
import Div100vh from 'react-div-100vh'

import { Provider } from './components/Store'
import Loader from './components/Loader'
import Site from './components/Site'

import './styles/index.sass'


const App: React.FC = () =>
  <Provider>
    <Div100vh>
      <Loader>
        <Site />
      </Loader>
    </Div100vh >
  </Provider>


export default App
