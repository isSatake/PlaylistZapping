import React, { Component } from 'react'
import autoBind from 'react-autobind'
import LazyLoadYouTube from './LazyLoadYouTube'

const opts = {
  height: '180',
  width: '320',
  playerVars: {
    rel: 0, //hide related videos
  }
}

export default class HoverTube extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHover: false,
      startVideoStandby: false,
      timerId: null
    }
    autoBind(this)
  }
  onMouseEnter() {
    if(!this.video){
      const loadTimer = setTimeout(() => {
        this.setState({
          isHover: true,
          startVideoStandby: true
        })
      }, 500)
      this.setState({
        loadTimer: loadTimer
      })
      return
    }
    const playTimer = setTimeout(() => {
      this.video.playVideo()
    }, 500)
    this.setState({
      isHover: true,
      playTimer: playTimer
    })
  }
  onMouseLeave() {
    this.setState({
      isHover: false
    })
    clearTimeout(this.state.loadTimer)
    if(!this.video){
      return
    }
    this.video.pauseVideo()
    clearTimeout(this.state.playTimer)
  }
  onReady(event) {
    this.video = event.target
    this.state.isHover && this.video.playVideo()
  }
  render() {
    return (
      <span
        style={this.props.style}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <LazyLoadYouTube
          isStandby={this.state.startVideoStandby}
          thumbUrl={this.props.thumbUrl}
          videoId={this.props.videoId}
          onReady={this.onReady}
          opts={opts} />
      </span>
    )
    // return (
    //   <span
    //     style={this.props.style}
    //     onMouseEnter={this.onMouseEnter}
    //     onMouseLeave={this.onMouseLeave}>
    //     <YouTube
    //       videoId={this.props.videoId}
    //       onReady={this.onReady}
    //       opts={opts}/>
    //     <LazyLoadYouTube
    //       playerState={this.state.playerState} />
    //   </span>
    // )
  }
}
