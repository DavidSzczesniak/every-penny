import DashboardAllocation from 'components/DashboardAllocation';
import DashboardChart from 'components/DashboardChart';
import DashboardHeader from 'components/DashboardHeader';
import DashboardStats from 'components/DashboardStats';
import PageWrapper from 'components/PageWrapper';
import { useFilters } from 'hooks/useFilters';
import React, { useEffect, useState } from 'react';
import { getDateRange } from 'utils/helpers';

const Dashboard = () => {
    const { filterByDateRange } = useFilters();
    const [period, setPeriod] = useState('30');

    useEffect(() => {
        const { startDate, endDate } = getDateRange(period);
        filterByDateRange([startDate, endDate]);
    }, [period]);

    return (
        <PageWrapper title="Dashboard">
            <div className="dashboard">
                <DashboardHeader period={period} setPeriod={setPeriod} />
                <main>
                    <DashboardStats />
                    <DashboardChart period={period} />
                    <DashboardAllocation />
                </main>
            </div>
        </PageWrapper>
    );
};

export default Dashboard;
