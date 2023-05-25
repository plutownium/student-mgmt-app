import React from "react";
import MenuItem from "./components/MenuItem";

const Sidebar: React.FC<{}> = () => {
    return (
        <div className="pt-12">
            <div className="h-full flex flex-col justify-between">
                <div>
                    <div className="">
                        <MenuItem location="/" text={"Home"} />
                        <MenuItem location={"/students/add/new"} text={"Add New Student"} />
                        <MenuItem location={"/students/list"} text={"Students List"} />
                        <MenuItem location={"/courses/add/new"} text={"Add New Course"} />
                        <MenuItem location={"/courses/list"} text={"Courses List"} />
                        <MenuItem location={"/results/add/new"} text={"Add New Results"} />
                        <MenuItem location={"/results/list"} text={"Results List"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
