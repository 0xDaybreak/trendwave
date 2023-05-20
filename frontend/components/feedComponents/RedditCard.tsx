import {FC, useEffect} from "react";
import './RedditCard.css';
import Subreddits from "Frontend/components/feedComponents/Subreddits";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";

interface RedditCardProps {
    avatar: string | undefined;
    topSubreddit:any;
}


const RedditCard: FC<RedditCardProps> = (props: RedditCardProps) => {

    return (
        <>
            <HorizontalLayout className={"reddit-card"}>
                <img className={"avatar"} src={props.avatar}/>
                <Subreddits topSubreddit={props.topSubreddit}/>
            </HorizontalLayout>

        </>
    );
}

export default RedditCard;