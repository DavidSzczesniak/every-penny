import { CurrencyDollarIcon, XIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { customButtonStyles } from 'utils/customButtonStyles';

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
                <button className="icon-button" onClick={toggleSidebar}>
                    <XIcon />
                </button>
            </div>
        </div>
        <div className="sidebar__links">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/list">Expenses List</Link>
        </div>
        <div className="sidebar__login">
            <Button color="green" radius="md" styles={customButtonStyles} size="md">
                Sign Up
            </Button>
        </div>
    </div>
);
export default Sidebar;
