import './CardStatusBar.css'
import Like from "Frontend/components/homeComponents/cardStatusComponents/Like";
import Favourite from "Frontend/components/homeComponents/cardStatusComponents/Favourite";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import React, {useEffect, useState} from "react";
import {VideoEntityEndpoint} from "Frontend/generated/endpoints";

interface CardStatusBarProps {
    id?:string;
}

const CardStatusBar:React.FC<CardStatusBarProps> = (props:CardStatusBarProps) => {
    const [fetchedLikes, setFetchedLikes] = useState<number | 0>(0);

    useEffect(() => {
        async function fetchData() {
            if(props.id) {
                const videoEntity = await VideoEntityEndpoint.findVideoEntityById(props.id);
                setFetchedLikes(videoEntity.likes || 0);
            }
        }
        fetchData();
    }, [props.id]);

    useEffect(() => {
        if (props.id) {
            VideoEntityEndpoint.updateLike(props.id, fetchedLikes);
        }
    }, [fetchedLikes, props.id]);

    const handleLikeClick = () => {
        setFetchedLikes(prevState => prevState+1);
    }

    return (
        <div className="card-status">
            <HorizontalLayout>
                <div onClick={handleLikeClick}>
                    <Like/>
                </div>
                <div className="likes">
                    {fetchedLikes}
                </div>
                <Favourite/>
            </HorizontalLayout>
        </div>
    );
}

export default CardStatusBar;
