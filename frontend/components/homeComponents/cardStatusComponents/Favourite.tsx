import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import "./Favourite.css";
import { UserEndpoint } from "Frontend/generated/endpoints";
import {openNotification, isOpened} from "Frontend/components/Notification";
import {Button} from "@hilla/react-components/Button.js";

interface FavouriteProps {
    vid?: string;
    isFavourite: Promise<boolean>;
    onFavouriteNotLoggedIn:()=>void;
}

const Favourite: React.FC<FavouriteProps> = (props: FavouriteProps) => {
    const [isFav, setIsFav] = useState(false);
    const [notificationOpened, setNotificationOpened] = useState(false);

    useEffect(() => {
        async function checkFav() {
            const result = await props.isFavourite;
            setIsFav(result);
        }
        checkFav();
    }, [props.isFavourite]);

    const handleFavouriteClick = async () => {
        if (await UserEndpoint.isLoggedIn()) {
            setIsFav(prevState => !prevState);
            if (!isFav) {
                UserEndpoint.saveFavourite(props.vid);
                openNotification("Saved Favourite", "bottom-start")
            } else {
                UserEndpoint.deleteFavourites(props.vid);
                openNotification("Removed Favourite", "bottom-start")
            }
        }
        else {
            props.onFavouriteNotLoggedIn();
        }
    }

    return (
            <Button className={"favourite-container"} onClick={handleFavouriteClick} disabled={isOpened()}>
                <FontAwesomeIcon icon={faBookmark} className={isFav ? "favourite-icon-yes" : "favourite-icon-no"}/>
            </Button>
    );
}

export default Favourite;