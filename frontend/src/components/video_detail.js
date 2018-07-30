import React from 'react';

import StreamController from './streamController'



class VideoDetail extends React.Component{
  constructor(props) {
  super(props);
  this.state = {

  };
}
  render(){
    const video = this.props.video;

  if(!video) {
    return <div>Loading...</div>;
  }

//  const videoId = video.id.videoId;
//  const link = "https://www.youtube.com/watch?v=" + videoId;
//  console.log(link);

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

      <hr/>
      <StreamController/>



    </div>
  );
}
};

export default VideoDetail;
