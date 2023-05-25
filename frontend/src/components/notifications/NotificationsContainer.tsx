import React, { useContext, useEffect, useState, useRef } from "react";

// import { INotification } from "../../interface/Notification.interface";
// import Notification from "./Notification";
// import { getAllUnreadNotifications } from "../../api/notificationsAPI";
import { NotificationsContext } from "../../context/NotificationsContext";
import NotificationsList from "./NotificationsList";
import DropdownContainer from "./dropdown/DropdownContainer";

const NotificationContainer: React.FC<{}> = () => {
    // const [notifications, setNotifications] = useState<INotification[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const { notifications, count, updateNotifications } = useContext(NotificationsContext);

    useEffect(() => {
        updateNotifications();
    }, []);

    // todo: background click target div

    // *** related to the dropdown ***
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [xOffset, setX] = useState<number | undefined>();
    const [yOffset, setY] = useState<number | undefined>();
    const getPosition = () => {
        const x = dropdownRef.current?.offsetLeft;
        if (!x) return; // it'll always be there.
        const xWithAdjustment = x + 255;
        setX(xWithAdjustment);

        const y = dropdownRef.current?.offsetTop;
        const approxInputHeight = 31;
        const yWithHeightOfInputFactoredIn = y ? y + approxInputHeight : y;
        setY(yWithHeightOfInputFactoredIn);
    };

    useEffect(() => {
        getPosition();
    }, []);
    useEffect(() => {
        window.addEventListener("resize", getPosition);
    }, []);
    // *** end dropdown section ***

    return (
        <div>
            <div className="border-2 border-zinc-100" ref={dropdownRef}>
                <button
                    className="w-full bg-zinc-100 hover:bg-zinc-200"
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    Notifications ({count})
                </button>
            </div>
            <div className={`${isOpen ? "" : "hidden"}`}>
                <DropdownContainer
                    isOpen={isOpen}
                    leftDisplacement={xOffset}
                    topDisplacement={yOffset}
                    width={200}
                    closeDropdown={() => {
                        setIsOpen(false);
                    }}
                >
                    <NotificationsList notifications={notifications} />
                </DropdownContainer>
            </div>
        </div>
    );
};

export default NotificationContainer;
