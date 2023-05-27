import React, {FC, useEffect, useState} from "react";
import './RedditCard.css';
import Subreddits from "Frontend/components/feedComponents/Subreddits";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";

interface RedditCardProps {
    avatar: string | undefined;
    topSubreddit:(string | undefined)[] | undefined;
    username: string | undefined;
}


const RedditCard: FC<RedditCardProps> = (props: RedditCardProps) => {

    const [isShow, setIsShow] = useState<boolean>();
    useEffect(()=>{
        if(window.innerWidth >= 768) {
            setIsShow(true);
        }
        else {
            setIsShow(false);
        }
    },[])

    return (
        <>
            <HorizontalLayout className={"reddit-card"}>
                <VerticalLayout>
                    <img className={"avatar"} src={props.avatar}/>
                    <a className={"redditor-username"} href={"https://reddit.com/user/" + props.username} target="_blank">
                        {props.username}
                    </a>
                </VerticalLayout>
                {isShow && <h3 style={{marginTop:"4rem", color:"whitesmoke"}}>Most active in:</h3>}
                <Subreddits topSubreddit={props.topSubreddit}/>
            </HorizontalLayout>

        </>
    );
}

export default RedditCard;