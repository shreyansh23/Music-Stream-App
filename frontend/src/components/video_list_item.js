import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {   // instead of passing props to the Component we can pass object of video prop like - {video}
  //{video} is same as defining, const video = props.video  This is a ES6 syntax.

  const imageUrl = video.snippet.thumbnails.default.url;

  return (
    <li onClick={() => onVideoSelect(video)} className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" src={imageUrl} />
        </div>

        <div className="media-body">
          <div className="media-heading"> {video.snippet.title} </div>
        </div>

      </div>
    </li>
  );
}

export default VideoListItem;
