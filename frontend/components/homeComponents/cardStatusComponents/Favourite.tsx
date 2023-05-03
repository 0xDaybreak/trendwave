import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import "./Favourite.css";
import { UserEndpoint } from "Frontend/generated/endpoints";
import {Button} from "@hilla/react-components/Button.js";
import {Notification} from "@hilla/react-components/Notification.js";
import {NotificationPosition} from "@vaadin/notification/src/vaadin-notification";

interface FavouriteProps {
    vid?: string;
    isFavourite: (id: string | undefined) => Promise<boolean>;
    onFavouriteNotLoggedIn:()=>void;
}

const Favourite: React.FC<FavouriteProps> = (props: FavouriteProps) => {
    const [isFav, setIsFav] = useState(false);
    const [notificationOpened, setNotificationOpened] = useState(false);

    const handleNotification = (message:string, position:NotificationPosition) => {
        setNotificationOpened(true);
        const notification = Notification.show(message, {
            position: position, duration: 4000
        });
        const handleOpenChanged = (e: any) => {
            if (!e.detail.value) {
                setNotificationOpened(false);
                notification.removeEventListener("opened-changed", handleOpenChanged);
            }
        };
        notification.addEventListener("opened-changed", handleOpenChanged);
    };

    useEffect(() => {
        async function checkFav() {
            const result = await props.isFavourite(props.vid);
            setIsFav(result);
        }
        checkFav();
    }, [props.isFavourite]);

    const handleFavouriteClick = async () => {
        if (await UserEndpoint.isLoggedIn()) {
            setIsFav(prevState => !prevState);
            if (!isFav) {
                UserEndpoint.saveFavourite(props.vid);
                handleNotification("Saved Favourite", "bottom-start")
            } else {
                UserEndpoint.deleteFavourites(props.vid);
                handleNotification("Removed Favourite", "bottom-start")
            }
        }
        else {
            props.onFavouriteNotLoggedIn();
        }
    }

    return (
            <Button className={"favourite-container"} onClick={handleFavouriteClick} disabled={notificationOpened}>
                <FontAwesomeIcon icon={faBookmark} className={isFav ? "favourite-icon-yes" : "favourite-icon-no"}/>
            </Button>
    );
}

export default Favourite;