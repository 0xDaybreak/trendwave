import './Card.css'
import React, {useEffect, useRef} from 'react';
import CardStatusBar from "Frontend/components/homeComponents/CardStatusBar";

interface CardProps {
    key?:number
    url?:string;
    width?:number;
    id?:string;
}

const Card:React.FC<CardProps> = (props:CardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

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

    useEffect(()=>{
        console.log("loaded")
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
            <video className="video-insert" muted disablePictureInPicture controlsList="nodownload" ref={videoRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <source src={props.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <CardStatusBar id={props.id}/>
        </div>
    );
}

export default Card;
