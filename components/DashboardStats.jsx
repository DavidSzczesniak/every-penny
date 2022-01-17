import { CollectionIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import React from 'react';

const DashboardStats = () => {
    return (
        <div className="dashboard__stats">
            <div className="dashboard-section">
                <div className="stat-text">
                    <div className="stat-text__title">
                        <h3>Total expenses</h3>
                        <div className="stat-icon">
                            <ShoppingCartIcon width={35} height={35} />
                        </div>
                    </div>
                    <p>$59.29</p>
                    <p>
                        A change of <strong>34%</strong> since last month
                    </p>
                </div>
            </div>
            <div className="dashboard-section">
                <div className="stat-text">
                    <div className="stat-text__title">
                        <h3>Top category</h3>
                        <div className="stat-icon">
                            <CollectionIcon width={35} height={35} />
                        </div>
                    </div>
                    <p>Electronics</p>
                    <p>
                        Changed from <strong>Bills</strong> last month
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
