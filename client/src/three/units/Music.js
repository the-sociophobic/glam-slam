import Unit from 'three/Unit'


class Music extends Unit {
  constructor(props) {
    super(props)

    this.state = {
      isPlaying: false,
      canPlay: false,
      duration: 0,
      currentTime: 0,  
    }

    this.initializeAudio()
  }

  setState = _state =>
    this.state = {
      ...this.state,
      ..._state,
    }

  initializeAudio = () => {
    this.audio = new Audio()

    this.audio.addEventListener('canplay',
      () => {
        this.setState({
          duration: this.audio.duration,
          canPlay: true,
        })
        this.props.unitLoaded()
      })

    this.audio.addEventListener('timeupdate',
      () => this.setState({ currentTime: this.audio.currentTime }))

    this.audio.addEventListener('ended', () => {
      this.pause()
      this.audio.currentTime = 0
      this.play()
    })

    this.audio.preload = 'auto'
    this.audio.src = this.props.file
    this.audio.load()
  }

  start = () => this.play()

  play = () => {
    this.audio.play()
    this.setState({ isPlaying: true })
  }

  pause = () => {
    this.audio.pause()
    this.setState({ isPlaying: false })
  }

  animate = props => {}
  dispose = props => {}
}


export default Music