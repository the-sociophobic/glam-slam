import React from 'react'

import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useSwipeable } from 'react-swipeable'
import { isMobile } from 'react-device-detect'

import ThreeScene from './ThreeScene'
import Cubes from '../three/units/Cubes'
import Lights from '../three/units/Lights'
import Road from '../three/units/Road'
import Char from '../three/units/Char'
import Environment from '../three/units/Environment'
import useKeyPress from '../hooks/useKeyPress'
import { clamp } from 'lodash'


export type GamePropsType = {}

const MAX_LINE = 3


const Game: React.FC<GamePropsType> = () => {
  const fullScreenHandle = useFullScreenHandle()
  const [showExitFullscreen, setShowExitFullscreen] = React.useState(false)

  //Char movement
  const [line, setLine] = React.useState(1)
  const move = (offset: number) => {
    setLine(clamp(line + offset, 0, MAX_LINE))
    // console.log('moved', line)
  }
  const swipeHandlers = useSwipeable({
    onSwipedLeft: e => move(-1),
    onSwipedRight: e => move(1),
  })
  const leftPressed = useKeyPress('ArrowLeft')
  const rightPressed = useKeyPress('ArrowRight')

  React.useEffect(() => {
    if (!isMobile) {
      if (!rightPressed && leftPressed)
        move(-1)
      if (rightPressed && !leftPressed)
        move(1)
    }
  }, [rightPressed, leftPressed])

  return (
    // <FullScreen handle={fullScreenHandle}>
      <div className='Game' {...swipeHandlers}>
        <ThreeScene
          id='3d-scene'
          gameData={{ line }}
          units={{
            // arc: {
            //   unit: Logo,
            //   disabled: false,
            // },
            // cubes: {
            //   unit: Cubes,
            //   disabled: false,
            // },
            lights: {
              unit: Lights,
              disabled: false,
            },
            road: {
              unit: Road,
              disabled: false,
            },
            char: {
              unit: Char,
              disabled: false,
            },
            // env: {
            //   unit: Environment,
            //   disabled: false,
            // },
          }}
        />
      </div>
    // </FullScreen>
  )
}


export default Game