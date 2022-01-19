import DashboardAllocation from 'components/DashboardAllocation';
import DashboardChart from 'components/DashboardChart';
import DashboardHeader from 'components/DashboardHeader';
import DashboardStats from 'components/DashboardStats';
import PageWrapper from 'components/PageWrapper';
import React from 'react';

const Dashboard = () => {
    return (
        <PageWrapper title="Dashboard">
            <div className="dashboard">
                <DashboardHeader />
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
