import React from 'react';
import { streamSocket } from '../webSocket.js';

export default class StreamController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://www.youtube.com/watch?v=Dx8J125s4cg",
      play: false,
      mute: false,
      duration: 0,
      seek: 0,
      volume: 100,
    };
  }
  send_data = (e) =>{
    let data = {
      url: this.state.url,
      play: this.state.play,
      mute: this.state.mute,
      duration: this.state.duration,
      seek: this.state.seek,
      volume: this.state.volume,
    }
    streamSocket.send(JSON.stringify(data));
  }

  handlePlay = () => {
      this.setState({play: !this.state.play}, () => {this.send_data()});
  }

  handleSeek = (e) => {
      this.setState({seek: e.target.value,}, () => {this.send_data()});
      console.log("handleSeek");
  }

  handleVolume = (e) => {
      this.setState({volume: e.target.value,}, () => {this.send_data();});
      console.log(this.state.volume);
  }

  handleMute = () => {
    this.setState({mute: !this.state.mute,}, () => {this.send_data();});
    console.log("handleMute");
  }

  toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  componentDidMount() {
    streamSocket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      this.setState({
        play: data['play'],
        url: data['url'],
        mute: data['mute'],
        duration: data['duration'],
        seek: data['seek'],
        volume: data['volume'],
      }, () => {
          if (!this.state.duration) {
      document.querySelector('.seek-slider').style.background = "linear-gradient(90deg, #ffd626 0%, #919191 0%)"
      console.log('inital');
    }
    else {
      let percentage = (this.state.seek/this.state.duration)*100
      document.querySelector('.seek-slider').style.background = "linear-gradient(90deg, #ffd626 "+percentage+"%, #919191 0%)"
    console.log('change');
    }
         });
    }

  }

  render() {

    return (
      <div id="wrap">
        <div  id="stream-controller">
          <button onClick={this.handlePlay}>{this.state.play ? 'Pause' : 'Play'}</button>
          Seek
          <input type="range" name="seek" min="0" max={this.state.duration} value={this.state.seek} onChange={this.handleSeek} className='seek-slider' />
          Volume
          <input type="range" name="volume" min="-1" max="100" value={this.state.volume} className='volume-slider' onChange={this.handleVolume} />
          Mute<input id='muted' type='checkbox' checked={this.state.mute} onChange={this.handleMute} />
        </div>
        
      </div>
    );
  }
}
