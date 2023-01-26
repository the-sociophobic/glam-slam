import {
  Scene as ThreeScene,
  Clock,
  WebGLRenderer,
  PerspectiveCamera,
} from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import isProd from '../utils/isProd'
import TransitionsHandler from './handlers/TransitionsHandler'


const maxFrameNumber = 25000


class Scene extends TransitionsHandler {

  scene: any
  numberOfLoadedUnits: number
  frameId: number = 0

  constructor(props: any) {
    super(props)

    this.scene = {
      renderer: undefined,
      camera: undefined,
      controls: undefined,
      scene: new ThreeScene(),
      composer: undefined,

      clock: new Clock(),
      frameNumber: 0,

      units: {},
      unitsToggled: false,
    }

    this.numberOfLoadedUnits = 0
  }

  init = (ViewerDiv: HTMLElement) => {
    const W = ViewerDiv.clientWidth
    const H = ViewerDiv.clientHeight

    //ADD RENDERER
    const optimise = W > 1200
    this.scene.renderer = new WebGLRenderer({ antialias: !optimise, alpha: true })
    this.scene.renderer.setClearColor(0x000000, 0)
    this.scene.renderer.setSize(W, H)
    this.scene.renderer.setPixelRatio(window.devicePixelRatio)

    ViewerDiv.appendChild(this.scene.renderer.domElement)

    //ADD CAMERA
    this.scene.camera = new PerspectiveCamera(
      50,
      W / H,
      0.1,
      1000
    )
    this.scene.controls = new OrbitControls(this.scene.camera, this.scene.renderer.domElement)
    this.scene.controls.enabled = false
    this.scene.camera.position.set(0, 138, 30)
    this.scene.controls.target.set(0, 125, 0)
    this.scene.controls.update()

    this.scene.composer = new EffectComposer(this.scene.renderer)
    this.scene.composer.addPass(new RenderPass(this.scene.scene, this.scene.camera))
    const glitchPass = new GlitchPass(7000)
    // this.scene.composer.addPass(glitchPass)

    this.initUnits()

    if (!this.frameId)
      this.frameId = requestAnimationFrame(this.animate.bind(this))
  }

  // dispose = () => {
  //   this.disposeUnits()
  //   cancelAnimationFrame(this.frameId)
  // }

  resize = (W: number, H: number) => {
    if (!this.scene.renderer || !this.scene.camera)
      return

    this.scene.camera.aspect = W / H
    this.scene.camera.updateProjectionMatrix()

    this.scene.renderer.setSize(W, H)
    this.scene.composer.setSize(W, H)
    this.scene.renderer.setPixelRatio(window.devicePixelRatio)
  }

  animate = (timestamp: number) => {
    this.scene.frameNumber = (this.scene.frameNumber + 1) % maxFrameNumber

    const { left, right, top, bottom } = this.scene.renderer.domElement.getBoundingClientRect()

    const isOffscreen =
      bottom < 0 ||
      top > this.scene.renderer.domElement.clientHeight ||
      right < 0 ||
      left > this.scene.renderer.domElement.clientWidth;

    if (!isOffscreen || true) {
      const {
        composer,
        units,
        clock,
        renderer,
        camera,
      } = this.scene

      Object.keys(units)
        .forEach(unitName =>
          units[unitName].animate({
            ...this.scene,
            input: this.scene.units.Controls,
            maxFrameNumber: maxFrameNumber,
          }))

      composer.render()
      // renderer.render(this.scene.scene, this.scene.camera)
    }

    this.frameId = requestAnimationFrame(this.animate.bind(this))
  }


  initUnits = () => {
    const props = {
      ...this.scene,
      input: this.scene.units.Controls,
      maxFrameNumber: maxFrameNumber,
    }


    if (this?.props?.units)
      Object.keys(this.props.units)
        .forEach(unitName => {
          const unit = this?.props?.units?.[unitName]

          if (unit?.unit)
            this.scene.units[unitName] = new unit.unit({
              ...props,
              ...unit.args,
              unitLoaded: () => this.unitLoaded(unitName),
            })
          this.scene.units[unitName].init &&
            this.scene.units[unitName].init()
        })
  }

  unitLoaded = (name: string) => {
    this.numberOfLoadedUnits++
    !isProd() && console.log(`${name} loaded`)

    if (this.numberOfLoadedUnits >= Object.keys(this.scene.units).length)
      this.props?.setLoaded?.()
  }

  startUnits = () =>
    Object.keys(this.scene.units)
      .forEach(unitName => {
        const unit = this.scene.units[unitName]

        unit?.start?.()
      })

  start = () =>
    this.startUnits()

  disposeUnits = () => {
    const {
      scene,
      units,
    } = this.scene

    Object.keys(units)
      .forEach(unitName => units[unitName].dispose())

    //REDO THIS SHIT: units should unregister themselves
    while (scene.children.length > 0)
      scene.remove(scene.children[0])
  }

  toggleUnits = () => {
    this.disposeUnits()
    this.scene.unitsToggled = !this.scene.unitsToggled
    this.initUnits()
  }

  receiveGameData = (props: any) => {
    const LINE_WIDTH = 7
    const x_pos = (props.line - 1.5) * LINE_WIDTH

    if (this.scene.camera && this.scene.units.char.model) {
      this.scene.units.char.model.position.x = x_pos
      this.scene.camera.position.x = x_pos
      this.scene.controls.target.x = x_pos
      this.scene.controls.update()
    }
  }
}


export default Scene