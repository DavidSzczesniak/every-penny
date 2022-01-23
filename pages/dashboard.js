import DashboardAllocation from 'components/DashboardAllocation';
import DashboardChart from 'components/DashboardChart';
import DashboardHeader from 'components/DashboardHeader';
import DashboardStats from 'components/DashboardStats';
import PageWrapper from 'components/PageWrapper';
import { ExpensesContext } from 'context/expensesContext';
import { useFilters } from 'hooks/useFilters';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import { getDateRange } from 'utils/helpers';
import Image from 'next/image';
import { Button } from '@mantine/core';
import { primaryButtonStyles } from 'utils/customButtonStyles';
import Link from 'next/link';

const Dashboard = () => {
    const { allExpenses } = useContext(ExpensesContext);
    const { filterByDateRange } = useFilters();
    const [period, setPeriod] = useState('30');

    useEffect(() => {
        const { startDate, endDate } = getDateRange(period);
        filterByDateRange([startDate, endDate]);
    }, [period]);

    return (
        <PageWrapper title="Dashboard">
            <div className="dashboard">
                {allExpenses.length > 0 ? (
                    <>
                        <DashboardHeader period={period} setPeriod={setPeriod} />
                        <main>
                            <DashboardStats period={period} />
                            <DashboardChart period={period} />
                            <DashboardAllocation />
                        </main>
                    </>
                ) : (
                    <div className="info-page">
                        <Image
                            src="/pixeltrue-search.png"
                            alt="magnifying glass"
                            width={400}
                            height={325}
                        />
                        <h2>Looks like you haven&apos;t added any expenses!</h2>
                        <p>
                            Use the button above or navigate to the Expenses List to add some
                            expenses.
                        </p>
                        <Link href="/list" passHref>
                            <Button styles={primaryButtonStyles}>Go there</Button>
                        </Link>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default Dashboard;
