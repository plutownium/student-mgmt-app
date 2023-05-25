import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
    text: string;
    location: string;
    changeActiveItem?: () => void;
    closeSidebar?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, location, changeActiveItem, closeSidebar }) => {
    return (
        <Link to={location}>
            <div
                onClick={changeActiveItem ? changeActiveItem : closeSidebar}
                className={`menuItemContainer flex flex-start pl-12 py-4 hover:bg-sky-100`}
            >
                <p className={`menuItemText text-black `}>{text}</p>
            </div>
        </Link>
    );
};

export default MenuItem;
