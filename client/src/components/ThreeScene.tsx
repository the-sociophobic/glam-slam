import React from 'react'

import ResizeObserver from 'resize-observer-polyfill'

import Scene from '../three/Scene'


export type ThreeScenePropsType = {
  id: string
  units: {
    [name: string]: {
      unit: any
      disabled?: boolean
    }
  }
  gameData: {
    line: number
  }
}


const ThreeScene: React.FC<ThreeScenePropsType> = (props) => {
  const viewerRef = React.useRef<HTMLDivElement>(null)
  let resizeObs
  const scene = React.useRef<null | Scene>(null)

  React.useEffect(() => {
    if (viewerRef.current && !scene.current) {
      resizeObs = new ResizeObserver(resize)
        .observe(viewerRef.current)

      // viewerRef.current.addEventListener( 'wheel', e => e.preventDefault(), { passive: false } )

      scene.current = new Scene(props)
      scene.current.init(viewerRef.current)
    }

    return () => {
      scene.current?.dispose()
      // viewerRef.removeChild(this.renderer.domElement)
    }
  }, [])

  React.useEffect(() => {
    scene.current?.receiveGameData(props.gameData)
  }, [props.gameData])

  const resize = () => {
    const ViewerDiv = viewerRef.current

    if (!ViewerDiv)
      return

    scene.current?.resize(ViewerDiv.clientWidth, ViewerDiv.clientHeight)
  }

  return (
    <div
      className="Viewer"
      ref={viewerRef}
    />
  )
}


export default ThreeScene