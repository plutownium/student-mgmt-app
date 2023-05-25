import React, { ReactNode, useRef, useEffect } from "react";

interface DropdownContainerProps {
    isOpen: boolean;
    topDisplacement: number | undefined;
    leftDisplacement: number | undefined;
    width: number;
    closeDropdown: () => void;
    children: ReactNode;
}

const DropdownContainer: React.FC<DropdownContainerProps> = ({
    isOpen,
    topDisplacement,
    leftDisplacement,
    width,
    closeDropdown,
    children,
}: DropdownContainerProps) => {
    return (
        <div className={`absolute ${isOpen ? "top-0 left-0 w-screen h-screen" : ""} `}>
            <div
                className="w-full h-full absolute z-30 bg-transparent"
                onClick={() => {
                    closeDropdown();
                }}
            >
                {/* // dropdown click target */}
            </div>
            <div
                className={`${isOpen ? "" : "hidden"} p-2 absolute bg-white border-2 rounded-lg z-40`}
                style={{ top: topDisplacement, left: leftDisplacement, width }}
            >
                {children}
            </div>
        </div>
    );
};

export default DropdownContainer;
