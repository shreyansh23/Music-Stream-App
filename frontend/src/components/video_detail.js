import React from 'react';
import ReactPlayer from 'react-player'
import { findDOMNode } from 'react-dom'
//import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'
import Duration from './../Duration'
import StreamController from './streamController'
import { streamSocket } from '../webSocket.js';



class VideoDetail extends React.Component{
  constructor(props) {
  super(props);
  this.state = {
    url: "",
    play:false,
    mute: false,
    duration: 0,
    seek: 0,
    volume: 100,
  };
}

load = url => {
  this.setState({
    url,
    played: 0,
    loaded: 0
  })

}
onPlay = () => {
//console.log('onPlay')
  this.setState({ playing: true })
}
onPause = () => {
//  console.log('onPause')
  this.setState({ playing: false })
}

onProgress = state => {
  //console.log('onProgress', state)
  // We only want to update time slider if we are not currently seeking
  if (!this.state.seeking) {
    this.setState(state)
  }
}
onEnded = () => {
//  console.log('onEnded')
  this.setState({ playing: this.state.loop })
}
onDuration = (duration) => {
  //console.log('onDuration', duration)
  this.setState({ duration })
}
onClickFullscreen = () => {
  screenfull.request(findDOMNode(this.player))
}
renderLoadButton = (url, label) => {
  return (
    <button onClick={() => this.load(url)}>
      {label}
    </button>
  )
}
ref = player => {
  this.player = player
}

  render(){
    console.log("checkout!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(url);
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.state
    const SEPARATOR = ' · '
    const video = this.props.video;
  if(!video) {
    return <div>Loading...</div>;
  }

  const videoId = video.id.videoId;
  const link = "https://www.youtube.com/watch?v=" + videoId;
  console.log(link);

  let data = {
        url: link,
        play: true,
        mute: false,
        duration: 0,
        seek: 0,
        volume: 100,
    }
    streamSocket.send(JSON.stringify(data));
    console.log("click video");


  return (
    <div className="video-detail col-md-8">
      <div className = "embed-responsive embed-responsive-16by9">
        <h1>HelloWorld</h1>
      </div>

      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
      <hr/>
      <div id="controls">
        <table><tbody>
              <tr>
                <th>Controls</th>
                <td>
                  <button onClick={this.stop}>Stop</button>
                  <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
                  <button onClick={this.onClickFullscreen}>Fullscreen</button>
                  <button onClick={this.setPlaybackRate} value={1}>1</button>
                  <button onClick={this.setPlaybackRate} value={1.5}>1.5</button>

                </td>
              </tr>
              <tr>
                <th>Seek</th>
                <td>
                  <input
                    type='range' min={0} max={1} step='any'
                    value={played}
                    onMouseDown={this.onSeekMouseDown}
                    onChange={this.onSeekChange}
                    onMouseUp={this.onSeekMouseUp}
                  />
                </td>
              </tr>
              <tr>
                <th>Volume</th>
                <td>
                  <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='muted'>Muted</label>
                </th>
                <td>
                  <input id='muted' type='checkbox' checked={muted} onChange={this.toggleMuted} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor='loop'>Loop</label>
                </th>
                <td>
                  <input id='loop' type='checkbox' checked={loop} onChange={this.toggleLoop} />
                </td>
              </tr>
              <tr>
                <th>Played</th>
                <td><progress max={1} value={played} /></td>
              </tr>
              <tr>
                <th>Loaded</th>
                <td><progress max={1} value={loaded} /></td>
              </tr>
            </tbody></table>
      </div>
      <hr/>
      <StreamController/>



    </div>
  );
}
};

export default VideoDetail;
