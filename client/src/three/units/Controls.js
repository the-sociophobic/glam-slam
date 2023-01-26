import _ from 'lodash'

import Unit from 'three/Unit'
import clamp from 'clamp'
import isTouchDevice from 'utils/isTouchDevice'
import isMobile from 'utils/isMobile'


const initialThis = {
  mouse: {
    alphaX: 0,
    alphaY: 0,
  },
  scroll: {
    alphaX: 0,
    alphaY: 0,
  },
}


export default class Controls extends Unit {
  constructor(props) {
    super(props)

    Object.keys(initialThis)
      .forEach(key => this[key] = initialThis[key])

    if (isTouchDevice()) {  
      ;
    }
    else {
      window.addEventListener('mousemove', this.handleMouseMove, false)
    }

    // window.addEventListener('scroll', this.handleScrollDebounced, false)

    props.unitLoaded()
  }


  init = () => {}

  animate = props =>
    this.handleScroll()

  
  handleMouseMove = e => {
    if (!e.clientX || !e.clientY) {
      console.log("no mouse found")
      return
    }

    this.mouse.alphaX = -e.clientX / window.innerWidth + .5
    this.mouse.alphaY = e.clientY / window.innerHeight - .5
  }

  handleScroll = e => {
    const h = document.documentElement, 
          b = document.body,
          st = 'scrollTop',
          sh = 'scrollHeight'

    const alpha = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight)

    this.scroll.alphaY = alpha
  }

  handleMouseMoveDebounced = _.debounce(this.handleMouseMove, 3)
  handleScrollDebounced = _.debounce(this.handleScroll, 3)


  dispose = () => {
    // window.removeEventListener('scroll', this.handleScrollDebounced, false)

    if (isTouchDevice())
      ;
    else
      window.removeEventListener('mousemove', this.handleMouseMove, false)
  }
}
