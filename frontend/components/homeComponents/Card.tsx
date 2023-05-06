import './Card.css'
import React, {useEffect, useRef, useState} from 'react';
import CardStatusBar from "Frontend/components/homeComponents/CardStatusBar";
import {VideoEntityEndpoint} from "Frontend/generated/endpoints";
import { Button } from "@hilla/react-components/Button.js";

interface CardProps {
    key?:number
    url?:string;
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

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
            videoRef.current.style.opacity = '100%';
        }
    }

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.style.opacity = '70%';
            if(videoRef.current.currentTime===videoRef.current.duration) {
                //videoRef.current.style.opacity = '100%';
            }
        }
    }

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
            <video className="video-insert" muted disablePictureInPicture controlsList="nodownload" ref={videoRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <source src={props.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <CardStatusBar id={props.id} subreddit={props.subreddit} tags={props.tags} post={props.post} isFavourite={props.isFavourite} onFavouriteNotLoggedIn={props.onFavouriteNotLoggedIn}/>
        </div>
    );
}

export default Card;
