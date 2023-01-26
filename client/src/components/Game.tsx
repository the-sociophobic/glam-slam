import React from 'react'

import ThreeScene from './ThreeScene'
import Cubes from '../three/units/Cubes'
import Lights from '../three/units/Lights'
import Environment from '../three/units/Environment'


export type GamePropsType = {}


const Game: React.FC<GamePropsType> = () =>
  <ThreeScene
    id="3d-scene"
    units={{
      // arc: {
      //   unit: Logo,
      //   disabled: false,
      // },
      cubes: {
        unit: Cubes,
        disabled: false,
      },
      lights: {
        unit: Lights,
        disabled: false,
      },
      // env: {
      //   unit: Environment,
      //   disabled: false,
      // },
    }}
  />


export default Game