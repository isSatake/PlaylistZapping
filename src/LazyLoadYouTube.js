import React, { Component } from 'react'
import autoBind from 'react-autobind'
import YouTube from 'react-youtube'

export default class LazyLoadYouTube extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player: <img src={this.props.thumbUrl}/>
    }

    autoBind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isStandby == true){
      this.setIframe()
    }
  }

  setIframe(){
    const iframe = <YouTube
                    videoId={this.props.videoId}
                    onReady={this.props.onReady}
                    opts={this.props.opts}/>

    this.setState({
      player: iframe
    })
  }

  render() {
    return this.state.player
  }
}
