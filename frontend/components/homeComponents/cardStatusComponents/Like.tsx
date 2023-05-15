import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart } from "@fortawesome/free-solid-svg-icons";
import './Like.css'
import React from "react";

interface LikeProps {
    onLikeClick: ()=>void;
    disabled: boolean;
}


const Like:React.FC<LikeProps> = (props:LikeProps) => {
    return (
        <>
            <button className="like-button" onClick={props.onLikeClick}>
                {props.disabled ? "" : <FontAwesomeIcon icon={faHeart } />}
            </button>
        </>

    );
};

export default Like;
