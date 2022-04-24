import { useAuth } from 'context/auth';
import React from 'react';

const DashboardHeader = () => {
    const { user } = useAuth();
    const firstName = user?.name.split(' ')[0];

    return (
        <header>
            <div className="dashboard__header">
                <h2>
                    Hi, <span>{firstName}</span>! Here&apos;s your report
                </h2>
                <p>This is an overview of how well you&apos;ve been managing your spending.</p>
            </div>
        </header>
    );
};

export default DashboardHeader;
