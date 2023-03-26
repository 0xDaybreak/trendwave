import './Card.css'
import React from 'react';

interface CardProps {
    name:string;
    value:number;
    img:string;
}

const Card:React.FC<CardProps> = (props:CardProps) => {
    return (
            <video className="card-item" controls>
                <source src="https://v.redd.it/qv58i2tz82qa1/DASH_360.mp4?source=fallback" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
    );
}

export default Card