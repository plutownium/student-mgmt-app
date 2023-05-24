import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
    text: string;
    active: boolean;
    location: string;
    changeActiveItem?: () => void;
    closeSidebar?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, active, location, changeActiveItem, closeSidebar }) => {
    return (
        <Link to={location}>
            <div
                onClick={changeActiveItem ? changeActiveItem : closeSidebar}
                className={`menuItemContainer flex flex-start px-6 py-4 ${active ? "activeItem" : ""}`}
            >
                <div className={`w-6 mr-2`}></div>
                <p className={`menuItemText`}>{text}</p>
            </div>
        </Link>
    );
};

export default MenuItem;
