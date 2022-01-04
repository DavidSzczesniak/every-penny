import React from 'react';
import { CurrencyDollarIcon, MenuIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { Button } from '@mantine/core';
import { customButtonStyles } from 'utils/customButtonStyles';

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
            <Button color="green" radius="md" styles={customButtonStyles}>
                Sign Up
            </Button>
        </div>
        <div className="navbar__button">
            <button className="icon-button" onClick={toggleSidebar}>
                <MenuIcon />
            </button>
        </div>
    </div>
);
export default Navbar;
