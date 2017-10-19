import React, { Component } from 'react'
import autoBind from 'react-autobind'
import HoverTube from './HoverTube'
import YouTube from 'react-youtube'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  render() {
    return (
        <HoverTube videoId='M7lc1UVf-VE'/>
    )
  }
}
