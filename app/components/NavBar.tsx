'use client';
import React, { useRef, useState } from "react";
import Link from "next/link";


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const menuOptionsRef = useRef<HTMLUListElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const getMenuHeight = () => {
        if (menuOptionsRef.current) {
            return isOpen ? `${menuOptionsRef.current.scrollHeight}px` : '0';
        }
        return isOpen ? 'auto' : '0';
    };

    const menuItemStyle = (color: string) => {
        return `bg-indigo-${color} border-b border-indigo-950 cursor-pointer text-center`
    }
    return (<>
        <nav className="w-full h-8v bg-indigo-200 sticky top-0 px-2">
            <div className="container mx-auto h-full">
                <div className="flex justify-between items-center h-full">
                    <span className="cursor-pointer" onClick={toggleDropdown}>Dropdown</span>
                    <img src="/game_assets/elad.svg" alt="ani" className="h-full" />
                </div>
            </div>
        </nav>
        <ul style={{ height: getMenuHeight() }}
            ref={menuOptionsRef}
            onClick={toggleDropdown}
            className={`${isOpen ? '' : 'pointer-events-none opacity-0'} pc:w-16 transition-all duration-500 ease-in-out overflow-hidden"`}>
            <li className={`${menuItemStyle("500")}`}><Link className="block w-full" href={'/'} >Home</Link></li>
            <li className={`${menuItemStyle("600")}`}><Link className="block w-full" href={'/game'}>Game</Link></li>
        </ul>
    </>);
};

export default Navbar;