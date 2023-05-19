import {FC} from "react";


interface SubredditsProps {
    topSubreddit:any;
}



const Subreddits:FC<SubredditsProps> = (props:SubredditsProps) => {
    console.log(props.topSubreddit)
    return (
        <div>
            <h2 style={{color:"white"}}>{props.topSubreddit}</h2>
        </div>
    );
}

export default Subreddits;