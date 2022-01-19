import { useDashboardStats } from 'hooks/useDashboardStats';
import React from 'react';

const DashboardAllocation = () => {
    const { categoryAllocation } = useDashboardStats();
    return (
        <div className="dashboard__allocation dashboard-section">
            <h3>Allocation</h3>
            <div className="allocation-bar">
                {categoryAllocation.map((category) => (
                    <div
                        key={category.name}
                        style={{
                            width: `${category.allocation}%`,
                            background: category.color,
                        }}
                    />
                ))}
            </div>
            <div className="allocation-legend">
                {categoryAllocation.map((category) => (
                    <div key={category.name}>
                        <div
                            className="allocation-legend__dot"
                            style={{
                                background: category.color,
                            }}
                        />
                        <span className="allocation-legend__label">{category.name}</span>
                        <span className="allocation-legend__percent">{category.allocation}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardAllocation;
