import { Button } from "@hilla/react-components/Button.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import {FC} from "react";
import './RedditCard.css';

interface SubredditsProps {
    topSubreddit:(string | undefined)[] | undefined
}



const Subreddits:FC<SubredditsProps> = (props:SubredditsProps) => {
    return (
        <VerticalLayout>
            {props.topSubreddit?.map((subreddit, index) => (
                <Button key={index} className={"subreddit-btn"} disabled={true}>
                    {subreddit}
                </Button>
            ))}
        </VerticalLayout>
    );
}

export default Subreddits;