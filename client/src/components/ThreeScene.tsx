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
}


const ThreeScene: React.FC<ThreeScenePropsType> = (props) => {
  const viewerRef = React.useRef<HTMLDivElement>(null)
  let resizeObs
  let scene: null | Scene = null

  React.useEffect(() => {
    if (viewerRef.current && !scene) {
      resizeObs = new ResizeObserver(resize)
        .observe(viewerRef.current)

      // viewerRef.current.addEventListener( 'wheel', e => e.preventDefault(), { passive: false } )

      scene = new Scene(props)
      scene.init(viewerRef.current)
    }

    return () => {
      scene?.dispose()
      // viewerRef.removeChild(this.renderer.domElement)
    }
  }, [])


  const resize = () => {
    const ViewerDiv = viewerRef.current

    if (!ViewerDiv)
      return

    scene?.resize(ViewerDiv.clientWidth, ViewerDiv.clientHeight)
  }

  return (
    <div
      className="Viewer"
      ref={viewerRef}
    />
  )
}


export default ThreeScene