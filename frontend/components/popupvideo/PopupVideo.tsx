import React, { useEffect, useRef, useState } from "react";
import "./PopupVideo.css";

interface PopupVideoProps {
    url?: any;
    audio?: any;
    onCardClick: (state: boolean, entityUrl: string, entityAudio: string) => void;
}

const PopupVideo: React.FC<PopupVideoProps> = (props: PopupVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const [isVideoShow, setIsVideoShow] = useState<boolean>(true);
    const [isAppending, setIsAppending] = useState<boolean>(false);

    useEffect(() => {
        const video = videoRef.current;

        if (video != null) {
            const mediaSource = new MediaSource();
            video.src = URL.createObjectURL(mediaSource);

            (async () => {
                try {
                    const videoSourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.4d401f"');
                    const audioSourceBuffer = mediaSource.addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
                    const videoResponse = await fetch(props.url);
                    const videoReader = videoResponse.body!.getReader();
                    const audioResponse = await fetch(props.audio);
                    const audioReader = audioResponse.body!.getReader();


                    while (true) {
                        const { done: videoDone, value: videoValue } = await videoReader.read();
                        const { done: audioDone, value: audioValue } = await audioReader.read();

                        if (videoDone && audioDone) {
                            mediaSource.endOfStream();
                            break;
                        }

                        if (!videoDone) {
                            await videoSourceBuffer.appendBuffer(videoValue!.buffer);
                        }

                        if (!audioDone) {
                            await audioSourceBuffer.appendBuffer(audioValue!.buffer);
                        }
                    }
                } catch (err) {
                    console.error('Error creating media source', err);
                }
            })();
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsVideoShow((prevIsVideoShow) => {
                    if (prevIsVideoShow) {
                        props.onCardClick(false, "", "");
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
                <video ref={videoRef} className={"video-insert-popup"} controls />
            </div>
        </div>
    );
};

export default PopupVideo;
