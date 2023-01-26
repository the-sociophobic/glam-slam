import * as THREE from 'three'
import Unit from 'three/Unit'

import modelLoader from 'three/loaders/modelLoader'

import file from 'three/units/random/Lego/model.glb'


export default class Model extends Unit {
  constructor(props) {
    super(props)

    this.loadModel()
  }

  loadModel = async () => {
    this.gtlf = await modelLoader(file)
    this.model = this.gtlf.scene

    // console.log(this.props.scene.environment)
    // setTimeout(() => {
    //   this.model.children.forEach(mesh => {
    //     mesh.material.envMap = this.props.scene.environment
    //     mesh.material.envMapIntensity = 5
    //     mesh.material.combine = THREE.MixOperation
    //     mesh.material.reflectivity = .5
    //     mesh.material.needsUpdate = true
    //   })
    //   // this.model.children.forEach(mesh =>
    //   //   console.log(mesh.material))
    // }, 1000)

    // this.model.castShadow = true
    // this.model.receiveShadow = true

    //ANIMATION
    this.mixer = new THREE.AnimationMixer( this.gtlf.scene )
    this.actions = []
    this.gtlf.animations.forEach((animation, index) => {
      this.actions.push( this.mixer.clipAction( animation ) )
      this.actions[index].play()
    })

    this.props.scene.add(this.model)
    this.props.unitLoaded()
  }

  animate = props => {
    let alpha = props.frameNumber / props.maxFrameNumber * 7

    this.model && (this.model.rotation.y = alpha * 2 * Math.PI)

    //ANIMATION
    this.mixer && this.mixer.update(props.clock.getDelta())
  }
  dispose = props => {}
}