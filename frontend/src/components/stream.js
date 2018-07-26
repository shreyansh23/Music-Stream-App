import React from 'react';
import ReactPlayer from 'react-player';
import { streamSocket } from '../webSocket.js';

const URL = "http://www.youtube.com/watch?v=";

export default class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://youtu.be/YuXLN23ZGQo?list=RDzRaoAWEY9Jo",
      play: false,
      mute: false,
      duration: 0,
      seek: 0,
      volume: 100,
    };
  }

  componentDidMount() {
    streamSocket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      this.setState({
        url: data['url'],
        play: data['play'],
        mute: data['mute'],
        duration: data['duration'],
        volume: data['volume'],
      });
      if (data['seek'] !== this.state.seek) {
        this.player.seekTo(data['seek']);
      }
    }
    console.log("mount from stream.js");
  }

  handlePlay = () => {
    this.setState({
      play: true,
    }, () => {
        let data = {
          play: this.state.play,
          url: this.state.url,
          mute: this.state.mute,
          duration: this.state.duration,
          seek: this.state.seek,
          volume: this.state.volume,
        };
        streamSocket.send(JSON.stringify(data));
      });
    console.log("handlePlay");
  }

  handlePause = () => {
    this.setState({
      play: false,
    }, () => {
        let data = {
          play: this.state.play,
          url: this.state.url,
          mute: this.state.mute,
          duration: this.state.duration,
          seek: this.state.seek,
          volume: this.state.volume,
        };
        streamSocket.send(JSON.stringify(data));
      });
    console.log("handlePause");
  }

  handleDuration = (duration) => {
    //let duration = this.player.getDuration();
    this.setState({
      duration: duration,
    }, () => {
        let data = {
          play: this.state.play,
          url: this.state.url,
          mute: this.state.mute,
          duration: this.state.duration,
          seek: this.state.seek,
          volume: this.state.volume,
        };
        streamSocket.send(JSON.stringify(data));
       });
    console.log("handleDuration");
    console.log(this.state.duration);
  }

  handleProgress = (data) => {
    this.setState({
      seek: data['playedSeconds'],
    }, () => {
        let data = {
          play: this.state.play,
          url: this.state.url,
          mute: this.state.mute,
          duration: this.player.getDuration(),
          seek: this.state.seek,
          volume: this.state.volume,
        };
        streamSocket.send(JSON.stringify(data));
       });
    console.log("handleProgress");
    console.log(this.state.play);
  }

  handleEnd = () => {
    this.setState({
      play: false,
      seek: 0,
      duration: 0,
    }, () => {
        let data = {
          play: this.state.play,
          url: this.state.url,
          mute: this.state.mute,
          duration: this.player.getDuration(),
          seek: this.state.seek,
          volume: this.state.volume,
        };
        streamSocket.send(JSON.stringify(data));
       });

  }

  ref = (player) => {
    this.player = player;
  }

  render() {
    return(
    <ReactPlayer
      ref={this.ref}
      url={URL+this.state.url}
      playing={this.state.play}
      onPlay={this.handlePlay}
      onPause={this.handlePause}
      muted={this.state.mute}
      volume={this.state.volume/100}
      onDuration={this.handleDuration}
      onProgress={this.handleProgress}
      onEnded={this.handleEnd}
    />
    );
  }
}
