import React, { Component } from 'react'
import autoBind from 'react-autobind'
import ReactList from 'react-list'
import { search } from './util/YouTubeApi'
import PlayList from './PlayList'

export default class PlayListsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      q: '',
      playlists: [],
      nextPageToken: null,
      hasMoreItems: false
    }
    autoBind(this)
    this.searchPlayLists()
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps: " + nextProps.q)
    if(this.state.q == nextProps.q){
      return
    }
    this.searchPlayLists(nextProps.q)
  }

  searchPlayLists(q){
    if(!q){
      return
    }
    let moreLists = []
    let nextPageToken = null
    search(q, this.state.nextPageToken).then(res => {
      console.log(res)
      // moreLists = res.items
      // nextPageToken = res.nextPageToken
      this.setState({
        playlists: []
      })
      this.setState({
        q: q,
        playlists: res.items,
        nextPageToken: res.nextPageToken,
        hasMoreItems: res.nextPageToken ? true : false
      })
    })

    // setTimeout(() => {
    //   console.log(moreLists)
    //   this.setState({
    //     playlists: this.state.playlists.concat(moreLists),
    //     nextPageToken: nextPageToken,
    //     hasMoreItems: nextPageToken ? true : false
    //   })
    // }, 500)
  }

  renderItem(index, key){
    const list = this.state.playlists[index]
    return(
      <PlayList
        key={key}
        id={list.id.playlistId}
        title={list.snippet.title}
        channelId={list.snippet.channelId}
        channelTitle={list.snippet.channelTitle} />
    )
  }

  render() {
    return(
      <ReactList
        itemRenderer={this.renderItem}
        length={this.state.playlists.length}
      />
    )
    // return (
    //   <InfiniteScroll
    //     next={this.searchPlayLists}
    //     hasMore={this.state.hasMoreItems}
    //     loader={<div>LOADING...</div>}>
    //     {this.state.playlists}
    //   </InfiniteScroll>
    // )
  }
}
