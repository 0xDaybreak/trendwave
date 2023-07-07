import {Notification} from "@hilla/react-components/Notification.js"
import {NotificationPosition, ShowOptions} from "@vaadin/notification/src/vaadin-notification";
import './homeComponents/ContextHolder.css';

let notificationOpened = false;

export const openNotification = (input: string, pos:NotificationPosition) => {
    notificationOpened = true;
    const options: ShowOptions = {
        position: pos,
        duration: 5000,
    };
    const notification = Notification.show(input, options);
    const handleOpenChanged = (e: any) => {
        if (!e.detail.value) {
            notificationOpened = false;
            notification.removeEventListener("opened-changed", handleOpenChanged);
        }
    };
    notification.addEventListener("opened-changed", handleOpenChanged);
}

export const isOpened = () => {
    return notificationOpened;
}

