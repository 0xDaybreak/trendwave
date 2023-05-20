import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import RedditCard from "Frontend/components/feedComponents/RedditCard";
import './FeedHolder.css';
import {useEffect, useState} from "react";
import Redditor from "Frontend/generated/com/video/application/entity/Redditor";
import {RedditorEndpoint, VideoEntityEndpoint} from "Frontend/generated/endpoints";
import Subreddits from "Frontend/components/feedComponents/Subreddits";

const FeedHolder = () => {

    const [redditors, setRedditors] = useState<(Redditor|undefined)[]>()

    const onStartUp = () => {
        RedditorEndpoint.retrieveRedditors().then(redditor=>setRedditors(redditor))
    }


    useEffect(()=> {
        onStartUp();
    },[])

    return(
      <div className={"feedholder-items"}>
          {redditors?.map(redditor=><RedditCard avatar={redditor?.avatarurl} topSubreddit={redditor?.topSubreddits}/>)}
      </div>
    );
}

export default FeedHolder;