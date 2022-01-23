import { CurrencyDollarIcon } from '@heroicons/react/solid';
import { Burger, Button } from '@mantine/core';
import { useAuth } from 'context/auth';
import Link from 'next/link';
import React from 'react';
import { primaryButtonStyles } from 'utils/customButtonStyles';
import NavUserInfo from './NavUserInfo';

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
    const { user, signinWithGoogle, signout } = useAuth();
    const burgerTitle = sidebarOpen ? 'Close sidebar' : 'Open sidebar';

    return (
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
                {user ? (
                    <NavUserInfo user={user} signout={signout} />
                ) : (
                    <Button
                        className="sign-in"
                        styles={primaryButtonStyles}
                        onClick={signinWithGoogle}>
                        Sign In
                    </Button>
                )}
            </div>
            <Burger
                className="navbar__button"
                opened={sidebarOpen}
                onClick={toggleSidebar}
                title={burgerTitle}
            />
        </div>
    );
};
export default Navbar;
