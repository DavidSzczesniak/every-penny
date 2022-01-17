import React from 'react';
import { getRandomColor } from 'utils/utils';

const DashboardAllocation = () => {
    const allocation = [
        {
            name: 'Bills',
            allocation: 50,
            color: getRandomColor(),
        },
        {
            name: 'Food',
            allocation: 30,
            color: getRandomColor(),
        },
        {
            name: 'Electronics',
            allocation: 20,
            color: getRandomColor(),
        },
    ];

    return (
        <div className="dashboard__allocation dashboard-section">
            <h3>Allocation</h3>
            <div className="allocation-bar">
                {allocation.map((category) => (
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
                {allocation.map((category) => (
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
