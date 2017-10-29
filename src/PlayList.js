 import React, { Component } from 'react'
import autoBind from 'react-autobind'
// import InfiniteScroll from 'react-infinite-scroll-component'
import ReactList from 'react-list'
import HoverTube from './HoverTube'
import { getPlaylistItemsById } from './util/YouTubeApi'

export default class PlayList extends Component {
  constructor(props) {
    super(props)
    autoBind(this)

    this.playlist = <a target="_blank" href={'https://www.youtube.com/playlist?list=' + this.props.id}>{this.props.title}</a>
    this.channel = <a target="_blank" href={'https://www.youtube.com/channel/' + this.props.channelId}>{this.props.channelTitle}</a>

    this.state = {
      videos: [],
      nextPageToken: null,
      hasMoreItems: false
    }
    this.getVideos()
  }

  getVideos(){
    console.log(this.props.id)
    let moreVideos = []
    let nextPageToken = null
    getPlaylistItemsById(this.props.id, this.state.nextPageToken || null).then(res => {
      moreVideos = res.items
      nextPageToken = res.nextPageToken
    })

    setTimeout(() => {
      this.setState({
        videos: this.state.videos.concat(moreVideos),
        nextPageToken: nextPageToken,
        hasMoreItems: nextPageToken ? true : false
      })
    }, 500)
  }

  renderItem(index, key){
    const video = this.state.videos[index]
    const title = video.snippet.title

    if(title == "Deleted video" || title == "Private video"){
      return null
    }

    const thumbUrl = video.snippet.thumbnails.medium.url //取れないことがある
    const videoId = video.contentDetails.videoId
    // return(
    //   <div
    //     key={key}
    //     style={{
    //       width:'320px',
    //       display: 'inline-block',
    //       lineHeight: '30px'
    //     }}>
    //     {index}
    //   </div>
    // )
    return(
      <HoverTube
        key={key}
        style={{
          width:'320px',
          display: 'inline-block',
          lineHeight: '30px'
        }}
        thumbUrl={thumbUrl}
        videoId={videoId} />
    )
  }

  render() {
    return(
      <div style={{
        height: '220px'
      }}>
        <p>{this.playlist} by {this.channel}</p>
        <div style={{
          overflow: 'auto',
          whiteSpace: 'nowrap'
        }}>
          <ReactList
            axis='x'
            itemRenderer={this.renderItem}
            length={this.state.videos.length} />
        </div>
      </div>
    )
  }
}
