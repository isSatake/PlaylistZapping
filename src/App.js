import React, { Component } from 'react'
import autoBind from 'react-autobind'
import PlayListsContainer from './PlayListsContainer'
import styles from './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      query: ''
    }
    autoBind(this)
  }

  componentDidMount() {
    this.input.focus()
  }

  handleSubmit(e) {
    console.log('submit')
    e.preventDefault() //リロード阻止
    e.stopPropagation()
    this.search()
  }

  handleChange(e){
    const value = e.target.value
    this.setState({
      value: value
    })
  }

  handleClear() {
    this.setState({
      value: ''
    })
  }

  search() {
    this.setState({
      query: this.state.value
    })
  }

  render() {
    return (
      <div>
        <form
          className="searchBox"
          onSubmit={this.handleSubmit} >
          <input
            type="text"
            placeholder="search from youtube"
            value={this.state.value}
            onChange={this.handleChange}
            ref={input => this.input = input} />
        </form>
        <PlayListsContainer q={this.state.query} />
      </div>
    )
  }
}
