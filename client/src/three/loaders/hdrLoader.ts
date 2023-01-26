import * as THREE from 'three'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import isProd from '../../utils/isProd'


const hdrLoader = async (file: any, debug?: boolean) =>
  new Promise((res, rej) =>
    new RGBELoader()
      .load(file,
        texture => {
          texture.mapping = THREE.EquirectangularReflectionMapping

          res(texture)
        },
        (progress: any) => {
          // const url = progress.srcElement.responseURL.split('/')
          // const name = url[url.length - 1].split('.')

          // !isProd() && debug &&
          //   console.log(`loading ${name[0]}.${name[2]} ${Math.floor(progress.loaded / progress.total * 100)}%`)
        },
        error =>
          rej(error)
      )
  )


export default hdrLoader