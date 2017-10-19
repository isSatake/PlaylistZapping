import React, { Component } from 'react'
import autoBind from 'react-autobind'
import YouTube from 'react-youtube'

export default class HoverTube extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  onMouseEnter() {
    this.video.playVideo()
  }
  onMouseLeave() {
    this.video.pauseVideo()
  }
  onReady(event) {
    this.video = event.target
  }
  render() {
    const id = this.props.videoId
    const opts = {
      playerVars: {
        rel: 0 //hide related videos
      }
    }
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <YouTube
          videoId={id}
          onReady={this.onReady}
          opts={opts}
        />
      </div>
    )
  }
}
