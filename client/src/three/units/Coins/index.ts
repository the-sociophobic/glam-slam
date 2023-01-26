import * as THREE from 'three'
import Unit from '../../Unit'
import modelLoader from '../../loaders/modelLoader'

import file from './coin.glb'


const ROAD_RADIUS = 137
const coinAmount = 35
var dummy = new THREE.Object3D()
var charachterPos = new THREE.Vector3()
const generateCoin = (index: number): CoinInstance => ({
  index,
  line: Math.round(Math.random() * 4),
  angle: 0
})

export type CoinInstance = {
  index: number
  line: number
  angle: number
}


class Coins extends Unit {

  gtlf: any
  model: any
  loaded: boolean = false
  coins: CoinInstance[]
  coinInstance: any

  constructor(props: any) {
    super(props)

    this.coins = Array
      .from(
        { length: coinAmount },
        (coin, index) => ({
          index: index,
          line: 0,
          angle: Math.PI + .1
        })
      )

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
    // this.props.scene.add(this.model)

    this.coinInstance = new THREE.InstancedMesh(this.model.children[0].geometry, this.model.children[0].material, coinAmount)
    this.coinInstance.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.props.scene.add(this.coinInstance)
    // this.props.scene.add(this.model)
    // this.model.position.set(0, 133, 25)

    this.props.unitLoaded()
  }

  animate = (props: any) => {
    if (this.model && this.coinInstance) {
      if (!this.loaded) {
        this.loaded = true
      }

      // let alpha = props.frameNumber / props.maxFrameNumber

      if (props.frameNumber % 100 === 0) {
        // console.log(this.coins.map(coin => coin.angle))
        const unusedCoin = this.coins.find(coin => coin.angle > Math.PI)
        if (unusedCoin)
          this.coins[unusedCoin.index] = generateCoin(unusedCoin.index)
      }
      this.coins.forEach(coin => {
        if (coin.angle <= Math.PI)
          coin.angle += Math.PI / 2000

        dummy.position.set(
          (coin.line - 1.5) * 7,
          Math.cos(coin.angle - Math.PI / 6) * ROAD_RADIUS,
          Math.sin(coin.angle - Math.PI / 6) * ROAD_RADIUS
        )
        dummy.scale.set(1, 1, 1)
        dummy.updateMatrix()
        this.coinInstance.setMatrixAt(coin.index, dummy.matrix)
      })
      this.coinInstance.instanceMatrix.needsUpdate = true
    }
  }

  dispose = (props: any) => { }
}


export default Coins