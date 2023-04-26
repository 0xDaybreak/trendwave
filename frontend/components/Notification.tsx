import {Notification} from "@hilla/react-components/Notification.js"
import {NotificationPosition} from "@vaadin/notification/src/vaadin-notification";

let notificationOpened = false;

export const openNotification = (input: string, pos:NotificationPosition) => {
    notificationOpened = true;
    const notification = Notification.show(input, {
        position: pos, duration: 5000
    });
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

