import PageWrapper from 'components/PageWrapper';
import { ProtectRoute } from 'context/auth';
import React from 'react';

const Dashboard = () => (
    <ProtectRoute>
        <PageWrapper title="Dashboard">
            <div>dashboard page</div>
        </PageWrapper>
    </ProtectRoute>
);

export default Dashboard;
