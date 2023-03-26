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
                <source src={props.img} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
    );
}

export default Card