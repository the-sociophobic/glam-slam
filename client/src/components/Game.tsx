import React from 'react'

import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import ThreeScene from './ThreeScene'
import Cubes from '../three/units/Cubes'
import Lights from '../three/units/Lights'
import Road from '../three/units/Road'
import Environment from '../three/units/Environment'


export type GamePropsType = {}


const Game: React.FC<GamePropsType> = () => {
  const fullScreenHandle = useFullScreenHandle()
  const [showExitFullscreen, setShowExitFullscreen] = React.useState(false)

  return (
    <FullScreen handle={fullScreenHandle}>
      <div className='Game'>
        <ThreeScene
          id='3d-scene'
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
            road: {
              unit: Road,
              disabled: false,
            },
            // env: {
            //   unit: Environment,
            //   disabled: false,
            // },
          }}
        />
      </div>
      {/* <button className='Button' onClick={}>
        Играть
      </button> */}
    </FullScreen>
  )
}


export default Game