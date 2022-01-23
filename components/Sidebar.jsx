import { Button } from '@mantine/core';
import { useAuth } from 'context/auth';
import Link from 'next/link';
import React from 'react';
import { primaryButtonStyles } from 'utils/customButtonStyles';
import NavUserInfo from './NavUserInfo';

const Sidebar = () => {
    const { user, signout, signinWithGoogle } = useAuth();

    return (
        <div className="sidebar">
            <div className="sidebar__links">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/list">Expenses List</Link>
            </div>
            <div className="sidebar__login">
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
        </div>
    );
};
export default Sidebar;
