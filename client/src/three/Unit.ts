export type UnitPropsType = any


export default class Unit {
  props?: UnitPropsType

  constructor(props: UnitPropsType) {
    this.props = props
  }

  init = (props?: UnitPropsType) => {}
  // loaded = () => {}
  animate = (frame: number) => {}
  dispose = (props?: any) => {}
}