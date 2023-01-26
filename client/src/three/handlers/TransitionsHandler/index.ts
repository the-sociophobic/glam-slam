import Unit from '../../../three/Unit'

import timingFuntions from './timingFunctions'


export default class TransitionsHandler extends Unit {
  transitions: any[]
  currentId: number

  constructor(props: any) {
    super(props)
    this.transitions = []
    this.currentId = 0
  }

  animateTransitions = () => {
    let unregisteredTransitions: any[] = []

    this.transitions.forEach(transition => {
      if (transition.currentFrame >= transition.numberOfFrames)
        unregisteredTransitions.push(transition)
      else {
        // const alpha = 1 / (transition.numberOfFrames - transition.currentFrame)
        const alpha = transition.currentFrame / transition.numberOfFrames
        const timingFuntion = timingFuntions[transition.timingFuntion] || ((t: any) => t)

        transition.variable.copy(transition.initialValue
          .clone()
          .lerp(transition.value, timingFuntion(alpha)))

        transition.currentFrame++
      }
    })

    unregisteredTransitions.forEach(transitionToUnregister => {
      transitionToUnregister.onComplete && transitionToUnregister.onComplete()
      this.unregisterTransition(transitionToUnregister.id)
    })
  }

  registerTransition = (props: any) => {
    this.transitions.push({
      id: this.currentId = (this.currentId + 1) % Number.MAX_SAFE_INTEGER,
      variable: props.variable,
      value: props.value.clone(),
      initialValue: props.variable.clone(),
      numberOfFrames: props.numberOfFrames || 10,
      currentFrame: 0,
      timingFuntion: props.timingFuntion || "none",
      onComplete: props.onComplete || (() => {}),
    })

    return this.currentId
  }

  unregisterTransition = (transitionId: number) => {
    const transitionIndex = this.transitions
      .map(transition => transition.id)
      .indexOf(transitionId)

    if (transitionIndex !== -1)
      this.transitions.splice(transitionIndex, 1)
  }

  unregisterAllTransitions = () => this.transitions.length = 0

  noActiveTransitions = () => this.transitions.length === 0

}