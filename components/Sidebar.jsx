import { CurrencyDollarIcon, XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';

const Sidebar = ({ toggleSidebar }) => (
    <div className="sidebar">
        <div className="navbar content-container">
            <Link href="/" passHref>
                <div className="navbar__logo">
                    <CurrencyDollarIcon />
                    every <span>penny</span>
                </div>
            </Link>
            <div className="navbar__button">
                <button className="button button--icon" onClick={toggleSidebar}>
                    <XIcon />
                </button>
            </div>
        </div>
        <div className="sidebar__links">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/list">Expenses List</Link>
        </div>
        <div className="sidebar__login">
            <button className="button button--body">Sign Up</button>
        </div>
    </div>
);
export default Sidebar;
