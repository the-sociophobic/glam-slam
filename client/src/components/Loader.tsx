import React from 'react'
import { Context } from './Store'


const LoadingScreen: React.FC = () => (
  <div className="LoadingScreen h-100 d-flex flex-column justify-content-center align-items-center">
    Loading...
  </div>
)

export type LoaderProps = {
  children?: React.ReactNode
}

const Loader: React.FC<LoaderProps> = ({ children }) => {
  const { registerInitializeCallback, ready } = React.useContext(Context)
  const [transparent, setTransparent] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (!mounted) {
      registerInitializeCallback?.(() => hide())
      setMounted(true)
    }
  })

  const hide = () => {
    setTransparent(true)
    setTimeout(() => setHidden(true), 900)
  }

  return (
    <>
      <div
        className={`
        Loader
        ${transparent && 'Loader--transparent'}
        ${hidden && 'd-none'}
      `}
      >
        <LoadingScreen />
      </div>
      {ready && children}
    </>
  )
}


export default Loader
export { LoadingScreen }
