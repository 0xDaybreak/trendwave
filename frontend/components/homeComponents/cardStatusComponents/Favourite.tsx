import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import "./Favourite.css";
import {UserEndpoint} from "Frontend/generated/endpoints";

interface FavouriteProps {
    vid?:string;
}


const Favourite:React.FC<FavouriteProps> = (props:FavouriteProps) => {

    const[isFavourite, setIsFavourite] = useState(false);

    const handleFavouriteClick = () => {
        setIsFavourite(prevState=>!prevState);
        console.log(props.vid)
        UserEndpoint.saveFavourite(props.vid);
        if(isFavourite) {

        }
    }

    return (
        <div className="favourite-container">
            <FontAwesomeIcon icon={faBookmark} onClick={handleFavouriteClick} className="favourite-icon " />
        </div>
    );
}

export default Favourite;
