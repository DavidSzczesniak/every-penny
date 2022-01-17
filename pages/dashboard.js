import { Select } from '@mantine/core';
import PageWrapper from 'components/PageWrapper';
import { periodOptions } from 'config/dashboardConfig';
import { useAuth } from 'context/auth';
import React, { useState } from 'react';
import DashboardStats from 'components/DashboardStats';
import DashboardAllocation from 'components/DashboardAllocation';
import DashboardChart from 'components/DashboardChart';

const Dashboard = () => {
    const { user } = useAuth();
    const firstName = user?.name.split(' ')[0];
    const [period, setPeriod] = useState('30');

    return (
        <PageWrapper title="Dashboard">
            <div className="dashboard">
                <header>
                    <div className="dashboard__header">
                        <h2>
                            Hi, <span>{firstName}</span>!
                        </h2>
                        <p>
                            This is an overview of how well you&apos;ve been managing your spending.
                        </p>
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
                <main>
                    <DashboardStats />
                    <DashboardChart />
                    <DashboardAllocation />
                </main>
            </div>
        </PageWrapper>
    );
};

export default Dashboard;
