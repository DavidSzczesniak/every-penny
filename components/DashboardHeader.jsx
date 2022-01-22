import { Select } from '@mantine/core';
import { periodOptions } from 'config/dashboardConfig';
import { useAuth } from 'context/auth';
import React from 'react';

const DashboardHeader = ({ period, setPeriod }) => {
    const { user } = useAuth();
    const firstName = user?.name.split(' ')[0];

    return (
        <header>
            <div className="dashboard__header">
                <h2>
                    Hi, <span>{firstName}</span>!
                </h2>
                <p>This is an overview of how well you&apos;ve been managing your spending.</p>
            </div>
            <div>
                <Select
                    aria-label="Select time period"
                    data={periodOptions}
                    value={period}
                    onChange={(value) => setPeriod(value)}
                />
            </div>
        </header>
    );
};

export default DashboardHeader;
