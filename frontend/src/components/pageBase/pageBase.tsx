import React, { useState, useContext, useLayoutEffect, Children } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import NotificationContainer from "../notifications/NotificationsContainer";

interface PageProps {
    children: JSX.Element;
}

const PageBase: React.FC<PageProps> = ({ children }: PageProps) => {
    return (
        <div id="pageBase" className="h-full w-full flex flex-col ">
            <div id="notification-bar" className="h-12 w-full flex ">
                <div className="w-3/5">{/* // empty spacer div */} </div>
                <div className="w-2/5">
                    <NotificationContainer />
                </div>
            </div>
            <div className="flex">
                <div id="sideBar" className="w-72 bg-zinc-100">
                    <div className={``}>
                        <Sidebar />
                    </div>
                </div>
                <div className="w-full ">{children}</div>
            </div>
        </div>
    );
};

export default PageBase;
