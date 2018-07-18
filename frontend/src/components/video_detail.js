import React from 'react';
import ReactPlayer from 'react-player'

const VideoDetail = ({video}) => {

  if(!video) {
    return <div>Loading...</div>;
  }

  const videoId = video.id.videoId;
  const url = "https://www.youtube.com/watch?v=" + videoId;
  console.log(url);

  return (
    <div className="video-detail col-md-8">
      <div className = "embed-responsive embed-responsive-16by9">
          <ReactPlayer url={url} playing />
      </div>

      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  );

};

export default VideoDetail;
