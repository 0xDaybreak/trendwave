import React, {useEffect, useRef, useState} from "react";
import "./PopupVideo.css";
import ReactPlayer from 'react-player'

interface PopupVideoProps {
    url?: any;
    audio?: any;
    hls?: string;
    onCardClick: (state: boolean, entityUrl: string, entityAudio: string, hls: string) => void;
}

const PopupVideo: React.FC<PopupVideoProps> = (props: PopupVideoProps) => {
        const videoRef = useRef<HTMLVideoElement>(null);
        const popupRef = useRef<HTMLDivElement>(null);
        const [isVideoShow, setIsVideoShow] = useState<boolean>(true);
        const [videoWidth, setVideoWidth] = useState('');

        useEffect(() => {
                const calculateVideoWidth = () => {
                    if (window.innerWidth >= 992) {
                        setVideoWidth('30%')
                    } else {
                        setVideoWidth('80%')
                    }
                }
            calculateVideoWidth();
            window.addEventListener('resize', calculateVideoWidth);

            return () => window.removeEventListener('resize', calculateVideoWidth);
            }, [])

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                    setIsVideoShow((prevIsVideoShow) => {
                        if (prevIsVideoShow) {
                            props.onCardClick(false, "", "", "");
                        }
                        return false;
                    });
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [props.url, props.audio]);

        return (
            <div className={"popup"}>
                <div ref={popupRef}>
                    <ReactPlayer
                        className='react-player'
                        url={props.hls}
                        width={videoWidth}
                        height='90%'
                        controls={true}
                        muted={false}
                    />
                </div>
            </div>
        );
    }
;

export default PopupVideo;