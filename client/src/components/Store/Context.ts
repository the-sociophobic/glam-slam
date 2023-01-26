import React from 'react'

import {
  StateType,
  NonStateType,
  initialState,
  initialNonState
} from './Types'


const Context = React.createContext<StateType & NonStateType>({
  ...initialState,
  ...initialNonState
})


export default Context