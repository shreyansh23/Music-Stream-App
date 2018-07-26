/*import React, { Component } from 'react';
import { connect } from 'react-redux'

import {echo} from './actions/echo'
import {serverMessage} from './reducers'
import
class App extends Component {
  componentDidMount() {
      this.props.fetchMessage('Hiii!')
  }

  render() {
    return (
      <div>
        <h2>Welcome to React</h2>
        <p>
            {this.props.message}
        </p>
      </div>
    );
  }
}

export default connect(
  state => ({ message: serverMessage(state) }),
  { fetchMessage: echo }
)(App);
*/
import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import streamController from './components/streamController'

const API_KEY = 'AIzaSyB5X9G5TCpeG8Hh3Jv6Fb4PCeviqgpEzhk';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('')
  }

  videoSearch(term) {
    YTSearch({key : API_KEY, term: term}, (videos) => {
      this.setState({
        videos, // this is declared using es6. This literally means this.setState({ videos: videos });
        selectedVideo : videos[0]
       });
    });
  }

  render() {

    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 400)


    return (
      <div>
        <SearchBar onSearchTermChange = { videoSearch } />
        <VideoDetail video = { this.state.selectedVideo } />
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
          videos = { this.state.videos } />
        <streamController/>
      </div>
    );
  }
}
