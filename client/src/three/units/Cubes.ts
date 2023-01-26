import {
  Object3D,
  Vector3,
  BoxGeometry,
  MeshStandardMaterial,
  InstancedMesh,
  DynamicDrawUsage
} from 'three'

import Unit from '../Unit'
import isMobile from '../../utils/isMobile'


const numberOfCubes = isMobile() ? 64 : 128
const cubeRadius = isMobile() ? .8 : 1
const cubeSpeed = isMobile() ? .17 : .135
const arenaRadius = isMobile() ? 20 : 26
var dummy = new Object3D()

export type cubeData = {
  index: number
  transitionId: number | undefined
  position: Vector3
  scale: Vector3
  speed: number
}


const cubeInitialPos = () =>
  new Vector3(
    (Math.random() - .5) * 2 * arenaRadius * .99 * (isMobile() ? .5 : 1),
    (Math.random() - .5) * 2 * arenaRadius * .99,
    (Math.random() - .5) * 2 * arenaRadius * .99
  )
const cubeInitialScale = () => {
  const side = (1 + Math.random()) * cubeRadius

  return new Vector3(side, side, side)
}
const cubeInitialSpeed = () =>
  (Math.random() + .1) * Math.sign(Math.random() - .5) * cubeSpeed


class Cubes extends Unit {

  cubes: cubeData[] = []
  cubeInstance: any

  constructor(props: any) {
    super(props)

    const { scene } = props

    this.cubes = Array
      .from(
        { length: numberOfCubes },
        (cube, index) => ({
          index: index,
          transitionId: undefined,
          position: cubeInitialPos(),
          scale: cubeInitialScale(),
          speed: cubeInitialSpeed()
        })
      )

    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshStandardMaterial({ color: 0x557755, metalness: 1 })
    this.cubeInstance = new InstancedMesh(geometry, material, numberOfCubes)
    this.cubeInstance.instanceMatrix.setUsage(DynamicDrawUsage)
    scene.add(this.cubeInstance)

    props.unitLoaded()
  }

  animate = (props?: any) => {
    if (!this.cubeInstance)
      return

    this.cubes.forEach(cube => {
      cube.position.y += cube.speed
      if (cube.position.y > arenaRadius)
        cube.position.y = -arenaRadius * .99
      if (cube.position.y < -arenaRadius)
        cube.position.y = arenaRadius * .99

      dummy.position.copy(cube.position)
      dummy.scale.copy(cube.scale)

      dummy.updateMatrix()
      this.cubeInstance.setMatrixAt(cube.index, dummy.matrix)
    })

    this.cubeInstance.instanceMatrix.needsUpdate = true
  }
  dispose = () => { }
}


export default Cubes