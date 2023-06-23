import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.scss";

const VideoPopup = ({ }) => {
 
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
          
        </div>
    );
};

export default VideoPopup;
