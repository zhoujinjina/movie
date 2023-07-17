import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.scss";

const VideoPopup = ({show,setShow,videoId,setVideoId }) => {
 
    return (
        <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} />
    );
};

export default VideoPopup;
