'use client';
import React, { useState } from 'react';
import './animatedMenu.css'

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            id="nav-icon"
            className={`hamburger ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default HamburgerMenu;