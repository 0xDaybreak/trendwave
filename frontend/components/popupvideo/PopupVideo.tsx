import React, {useEffect, useRef, useState} from "react";
import './PopupVideo.css';

interface PopupVideoProps {
    url?:any;
    audio?:any;
    onCardClick:(state:boolean, entityUrl:string, entityAudio:string)=>void;
}

const PopupVideo:React.FC<PopupVideoProps> = (props:PopupVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const [isVideoShow, setIsVideoShow] = useState<boolean>(true);

    useEffect(() => {
        const video = videoRef.current;

        // Create a MediaSource object
        const mediaSource = new MediaSource();

        // Set up the video element to use the MediaSource object as its source
        if(video!=null) {
            video.src = URL.createObjectURL(mediaSource);
        }

        // When the MediaSource object is ready, create a SourceBuffer and append the video and audio sources
        mediaSource.addEventListener('sourceopen', () => {
            const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.4d401f"');
            fetch(props.url)
                .then((response) => response.arrayBuffer())
                .then((buffer) => sourceBuffer.appendBuffer(buffer));

            const audioSourceBuffer = mediaSource.addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
            fetch(props.audio)
                .then((response) => response.arrayBuffer())
                .then((buffer) => audioSourceBuffer.appendBuffer(buffer));
        });

        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                setIsVideoShow(false)
                props.onCardClick(isVideoShow,'','');
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props.url, props.audio]);

    return (
      <div className={"popup"}>
          <div className={"popup-content"} ref={popupRef}>
          <video ref={videoRef} className={"video-insert"} controls />
          </div>
      </div>
    );
}

export default PopupVideo;