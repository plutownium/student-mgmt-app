import React, { useState, useContext, useLayoutEffect, Children } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";

interface PageProps {
    children: JSX.Element;
}

const PageBase: React.FC<PageProps> = ({ children }: PageProps) => {
    return (
        <div id="pageBase" className="h-full w-full flex ">
            <div id="sideBar" className="w-72 border-4 border-black">
                <div className={``}>
                    <Sidebar />
                </div>
            </div>
            <div className="w-full border-4 border-red-500">{children}</div>
        </div>
    );
};

export default PageBase;
