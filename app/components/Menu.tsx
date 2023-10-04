import React, { useRef } from 'react';
import Link from "next/link";

const classes = 'text-2xl text-center border-b border-indigo-950 cursor-pointer';

type Props = {
    isOpen: boolean;
    toggleDropdown: () => void;
}
const Menu = ({ isOpen, toggleDropdown }: Props) => {
    const menuOptionsRef = useRef<HTMLUListElement>(null);

    const getMenuHeight = () => {
        if (menuOptionsRef.current) {
            return isOpen ? `${menuOptionsRef.current.scrollHeight}px` : '0';
        }
        return isOpen ? 'auto' : '0';
    };

    return (
        <ul style={{ height: getMenuHeight() }}
            ref={menuOptionsRef}
            onClick={toggleDropdown}
            className={`absolute ${isOpen ? '' : 'pointer-events-none opacity-0'} w-full pc:w-40 transition-all duration-500 ease-in-out overflow-hidden"`}>
            <li className={`${classes} bg-indigo-500`}><Link className="block w-full" href={'/'} >Home</Link></li>
            <li className={`${classes} bg-indigo-600`}><Link className="block w-full" href={'/game'}>Game</Link></li>
            <li className={`${classes} bg-indigo-700`}><Link className="block w-full" href={'/addLevel'}>Add Level</Link></li>
        </ul>
    )
}

export default Menu