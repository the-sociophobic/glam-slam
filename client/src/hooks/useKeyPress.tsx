import React from 'react'

import _ from 'lodash'


const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = React.useState(false)

  const downHandler = _.debounce(({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  })

  const upHandler = _.debounce(({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  })

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  return keyPressed
}


export default useKeyPress