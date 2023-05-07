import './Card.css'
import React, {useEffect, useRef, useState} from 'react';
import CardStatusBar from "Frontend/components/homeComponents/CardStatusBar";
import {VideoEntityEndpoint} from "Frontend/generated/endpoints";
import { Button } from "@hilla/react-components/Button.js";

interface CardProps {
    key?:number
    url?:any;
    audio?:any;
    width?:number;
    id?:string;
    tags?:(string|undefined)[];
    subreddit?:string|undefined;
    post:string|undefined;
    isFavourite: (id: string | undefined) => Promise<boolean> ;
    onFavouriteNotLoggedIn:()=>void;
}

const Card:React.FC<CardProps> = (props:CardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isNewVideo, setIsNewVideo] = useState(false);

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
    }, [props.url, props.audio]);

    const checkIsNewVideo = async () => {
        const isNew = await VideoEntityEndpoint.isNew(props.id);
        setIsNewVideo(isNew);
    }


    useEffect(()=>{
        checkIsNewVideo();
        const video:any = videoRef.current;
        video.addEventListener('click',()=>{
            video.unmute;
            if(video.paused){
                video.play();
            } else {
                video.pause();
            }
        })
    },[])

    return (
        <div style={{width:props.width}} className="card-item" >
            {isNewVideo && <Button disabled className="new-video">New</Button>}
            <video ref={videoRef} className={"video-insert"} controls />
            <CardStatusBar id={props.id} subreddit={props.subreddit} tags={props.tags} post={props.post} isFavourite={props.isFavourite} onFavouriteNotLoggedIn={props.onFavouriteNotLoggedIn}/>
        </div>
    );
}

export default Card;
