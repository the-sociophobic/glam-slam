import * as THREE from 'three'
import Unit from '../../Unit'
import modelLoader from '../../loaders/modelLoader'

import file from './hairy-girl.glb'


class Char extends Unit {

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
    // this.model.children.forEach((child: any) => {
    //   child.children.forEach((child: any) => {
    //     child.material.map.minFilter = THREE.NearestFilter
    //     child.material.map.magFilter = THREE.NearestFilter
    //   })
    // })
    this.props.scene.add(this.model)

    this.props.unitLoaded()
  }

  animate = (props: any) => {
    if (this.model) {
      if (!this.loaded) {
        this.loaded = true

        this.model.rotation.y = Math.PI
        if (document.body.clientWidth > document.body.clientHeight) {
          this.model.scale.set(1, 1, 1)
          this.model.position.set(0, 133, 25)
        } else {
          this.model.scale.set(1.2, 1.2, 1.2)
          this.model.position.set(0, -2, 0)
        }
      }

      let alpha = props.frameNumber / props.maxFrameNumber

      // this.model.rotation.x = Math.PI * alpha * 2
      // this.model.rotation.y = Math.cos(alpha * 15 * Math.PI)
      // this.model.rotation.x = alpha * 15 * Math.PI
    }
  }

  dispose = (props: any) => { }
}


export default Char