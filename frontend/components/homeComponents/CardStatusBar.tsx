import './CardStatusBar.css'
import Like from "Frontend/components/homeComponents/cardStatusComponents/Like";
import Favourite from "Frontend/components/homeComponents/cardStatusComponents/Favourite";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import React, {useEffect, useState} from "react";
import {VideoEntityEndpoint} from "Frontend/generated/endpoints";
import VideoEntity from "Frontend/generated/com/video/application/entity/VideoEntity";

interface CardStatusBarProps {
    id?:string;
}

const CardStatusBar:React.FC<CardStatusBarProps> = (props:CardStatusBarProps) => {

    const [likes, setLikes] = useState(0);

    const fetchData = async () => {
        if(props.id) {
            const videoEntity:VideoEntity | any = await VideoEntityEndpoint.findVideoEntityById(props.id);
            if(videoEntity.likes != null) {
                setLikes(videoEntity.likes);
            }
            else {
                throw new Error("Invalid video");
            }
        }
        else {
            throw new Error("Cannot retrieve item with id")
        }
    }
    useEffect(()=>{fetchData()},[]);

    const handleLikeClick = () => {
        if (props.id) {
            const updatedLikes = likes + 1;
            setLikes(updatedLikes);
            VideoEntityEndpoint.updateLike(props.id, updatedLikes);
        }
    }

    return (
        <div className="card-status">
            <HorizontalLayout>
                <div onClick={handleLikeClick}>
                    <Like/>
                </div>
                <div className="likes">
                    {likes}
                </div>
                <Favourite vid={props.id}/>
            </HorizontalLayout>
        </div>
    );
}

export default CardStatusBar;
