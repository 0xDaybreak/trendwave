import RedditCard from "Frontend/components/feedComponents/RedditCard";
import './FeedHolder.css';
import {useEffect, useState} from "react";
import Redditor from "Frontend/generated/com/video/application/entity/Redditor";
import {RedditorEndpoint, VideoEntityEndpoint} from "Frontend/generated/endpoints";

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
          {redditors?.map((redditor, index)=>
              <RedditCard key={index} avatar={redditor?.avatarurl} topSubreddit={redditor?.topSubreddits} username={redditor?.redditUsername}/>)}
      </div>
    );
}

export default FeedHolder;