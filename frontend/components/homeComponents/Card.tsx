import './Card.css'
import React from 'react';

interface CardProps {
    url?:string;
}

const Card:React.FC<CardProps> = (props:CardProps) => {
    return (
            <video className="card-item" controls>
                <source src={props.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
    );
}

export default Card