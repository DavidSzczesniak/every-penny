import { CurrencyDollarIcon, MenuIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import { useAuth } from 'context/auth';
import Link from 'next/link';
import React from 'react';
import { primaryButtonStyles } from 'utils/customButtonStyles';

const Navbar = ({ toggleSidebar }) => {
    const { user, signinWithGoogle, signout } = useAuth();
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
                    <>
                        <p>{user.name}</p>
                        <Button styles={primaryButtonStyles} onClick={signout}>
                            Sign Out
                        </Button>
                    </>
                ) : (
                    <Button styles={primaryButtonStyles} onClick={signinWithGoogle}>
                        Sign In
                    </Button>
                )}
            </div>
            <div className="navbar__button">
                <button className="icon-button" onClick={toggleSidebar}>
                    <MenuIcon />
                </button>
            </div>
        </div>
    );
};
export default Navbar;
