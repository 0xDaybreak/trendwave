import './Card.css'
import React from 'react';
import CardStatusBar from "Frontend/components/homeComponents/CardStatusBar";

interface CardProps {
    key?:number
    url?:string;
}

const Card:React.FC<CardProps> = (props:CardProps) => {
    return (
        <div className="card-item" >
            <video className="video-insert" controls>
                <source src={props.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <CardStatusBar/>
        </div>
    );
}

export default Card