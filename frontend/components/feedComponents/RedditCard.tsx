import {FC, useEffect} from "react";
import './RedditCard.css';

interface RedditCardProps {
    avatar: string | undefined;
}


const RedditCard: FC<RedditCardProps> = (props: RedditCardProps) => {

    return (
            <div className={"reddit-card"}>
                <img src={props.avatar}/>
            </div>
    );
}

export default RedditCard;