import React, { useEffect, useState } from "react";
import { VideoEntityEndpoint } from "Frontend/generated/endpoints";
import VideoEntity from "Frontend/generated/com/video/application/entity/VideoEntity";
import Like from "Frontend/components/homeComponents/cardStatusComponents/Like";
import Favourite from "Frontend/components/homeComponents/cardStatusComponents/Favourite";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import "./CardStatusBar.css";

interface CardStatusBarProps {
    id?: string;
    tags?: (string | undefined)[];
    post: string | undefined;
    subreddit?: string | undefined;
    isFavourite: (id: string | undefined) => Promise<boolean>;
    onFavouriteNotLoggedIn: () => void;
}

const CardStatusBar: React.FC<CardStatusBarProps> = (props: CardStatusBarProps) => {
    const [likes, setLikes] = useState(0);

    const fetchData = async () => {
        if (props.id) {
            const videoEntity: VideoEntity | any = await VideoEntityEndpoint.findVideoEntityById(props.id);
            if (videoEntity.likes != null) {
                setLikes(videoEntity.likes);
            } else {
                throw new Error("Invalid video");
            }
        } else {
            throw new Error("Cannot retrieve item with id");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLikeClick = () => {
        if (props.id) {
            const updatedLikes = likes + 1;
            setLikes(updatedLikes);
            VideoEntityEndpoint.updateLike(props.id, updatedLikes);
        }
    };

    return (
        <div className="card-status">
            <hr className={"hr"}></hr>
            <HorizontalLayout>
                <div className="likes">
                    <Like onLikeClick={handleLikeClick} />
                    {likes}
                </div>
                <div className="subreddit">
                        <a className={"nostyle"} href={"http://reddit.com/" + props.post} target="_blank">
                            {" r/" + props.subreddit}
                        </a>
                </div>
                    <Favourite vid={props.id} isFavourite={props.isFavourite} onFavouriteNotLoggedIn={props.onFavouriteNotLoggedIn} />
            </HorizontalLayout>
        </div>
    );
};

export default CardStatusBar;
