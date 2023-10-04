'use client';
import React, { useRef, useState } from "react";
import Menu from "./Menu";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (<>
        <nav className="w-full h-8v bg-indigo-200 sticky top-0 px-2">
            <div className="container mx-auto h-full">
                <div className="flex justify-between items-center h-full">
                    {/* <span className="cursor-pointer" onClick={toggleDropdown}>Dropdown</span> */}
                    <img className="h-8 cursor-pointer" src={`/game_assets/${`${isOpen ? 'x' : 'menu'}-icon`}.svg`} alt="menu" onClick={toggleDropdown} />
                    <img src="/game_assets/elad.svg" alt="ani" className="h-full" />
                </div>
            </div>
        </nav>
        <Menu isOpen={isOpen} toggleDropdown={toggleDropdown} />
    </>);
};

export default Navbar;