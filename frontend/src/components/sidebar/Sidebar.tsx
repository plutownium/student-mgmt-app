import React, { useCallback, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import MenuItem from "./components/MenuItem";

const Sidebar: React.FC<{}> = () => {
    const location = useLocation();

    function getLocation(path: string) {
        if (path === "/dashboard") {
            return 1;
        } else if (path === "/search") {
            return 2;
        } else if (path === "/map") {
            return 3;
        } else if (path === "/feedback") {
            return 4;
        } else {
            throw new Error("Unsupported value for path");
        }
    }

    const [activeItem, setActiveItem] = useState(1);

    return (
        <div className="pt-12">
            <div className="h-full flex flex-col justify-between">
                <div>
                    <div className="">
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(1);
                                setActiveItem(1);
                            }}
                            location="/home"
                            text={"Home"}
                            active={activeItem === 1}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(2);
                                setActiveItem(2);
                            }}
                            location={"/students/add/new"}
                            text={"Add New Student"}
                            active={activeItem === 2}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(3);
                                setActiveItem(3);
                            }}
                            location={"/students/list"}
                            text={"Students List"}
                            active={activeItem === 3}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(4);
                                setActiveItem(4);
                            }}
                            location={"/courses/add/new"}
                            text={"Add New Course"}
                            active={activeItem === 4}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(5);
                                setActiveItem(5);
                            }}
                            location={"/courses/list"}
                            text={"Courses List"}
                            active={activeItem === 5}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(6);
                                setActiveItem(6);
                            }}
                            location={"/results/add/new"}
                            text={"Add New Results"}
                            active={activeItem === 6}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(7);
                                setActiveItem(7);
                            }}
                            location={"/results/list"}
                            text={"Results List"}
                            active={activeItem === 7}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
