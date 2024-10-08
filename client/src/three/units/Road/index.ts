import * as THREE from 'three'
import Unit from '../../Unit'
import modelLoader from '../../loaders/modelLoader'

import file from './road.glb'


class Road extends Unit {

  gtlf: any
  model: any
  loaded: boolean = false

  constructor(props: any) {
    super(props)

    this.loadModel()
  }

  loadModel = async () => {
    this.gtlf = await modelLoader(file)
    this.model = this.gtlf.scene
    this.model.children.forEach((child: any) => {
      child.children.forEach((child: any) => {
        child.material.map.minFilter = THREE.NearestFilter
        child.material.map.magFilter = THREE.NearestFilter
      })
    })
    this.props.scene.add(this.model)

    this.props.unitLoaded()
  }

  animate = (props: any) => {
    if (this.model) {
      if (!this.loaded) {
        this.loaded = true

        this.model.rotation.y = Math.PI
        this.model.scale.set(135, 135, 135)
        // this.model.position.set(0, -100, -30)
      }

      let alpha = props.frameNumber / props.maxFrameNumber

      this.model.rotation.x = Math.PI * alpha * 4.5
      // this.model.rotation.y = Math.cos(alpha * 15 * Math.PI)
      // this.model.rotation.x = alpha * 15 * Math.PI
    }
  }

  dispose = (props: any) => { }
}


export default Road