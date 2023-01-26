export type OpenPopupProps = {
  text?: string | React.ReactNode
  button?: {
    label?: string | React.ReactNode
    color?: string
    onClick?: () => void
  }
  showLoader?: boolean
}


export type StateType = {
  ready: boolean

  popup?: OpenPopupProps,

  contentfulData: any
  contentful: {} | any
}
const initialState = {
  ready: false,

  contentfulData: {},
  contentful: {},
}


export type NonStateType = {
  setState: (obj: Partial<StateType>) => void
  registerInitializeCallback: (fn: () => void) => void
  openPopup: (props: OpenPopupProps) => void
  closePopup: () => void
  updatePopup: (props: OpenPopupProps) => void
}
const initialNonState: NonStateType = {
  setState: () => {},
  registerInitializeCallback: (fn: () => void) => {},
  openPopup: () => {},
  closePopup: () => {},
  updatePopup: () => {},
}


export {
  initialState,
  initialNonState
}
