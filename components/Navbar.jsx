import React from 'react';
import { CurrencyDollarIcon, MenuIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const Navbar = ({ toggleSidebar }) => (
    <div className="navbar content-container">
        <Link href="/" passHref>
            <div className="navbar__logo">
                <CurrencyDollarIcon />
                every <span>penny</span>
            </div>
        </Link>
        <div className="navbar__links">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/list">Expenses List</Link>
            <button className="button">Sign Up</button>
        </div>
        <div className="navbar__button">
            <button className="button button--icon" onClick={toggleSidebar}>
                <MenuIcon />
            </button>
        </div>
    </div>
);
export default Navbar;
