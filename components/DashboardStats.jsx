import { CollectionIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import { periodOptions } from 'config/dashboardConfig';
import { useDashboardStats } from 'hooks/useDashboardStats';
import React from 'react';
import variables from 'styles/base/_settings.module.scss';

const DashboardStats = ({ period }) => {
    const { totalAmount, totalAmountChange, topCategory, topCategoryChange } =
        useDashboardStats(period);
    const periodLabel = periodOptions.find((x) => x.value === period).label.toLowerCase();

    const AmountChange = () => {
        if (!totalAmountChange || Number(period) > 30 || period === 'all') return null;

        // figure out color based on percentage change, 0 stays grey
        const changeStyle = { color: variables.grey };
        if (Math.sign(totalAmountChange) === 1) {
            changeStyle.color = variables.red;
        } else if (Math.sign(totalAmountChange) === -1) {
            changeStyle.color = variables.green;
        }

        return (
            <p className="stat-box__change">
                A change of <strong style={changeStyle}>{totalAmountChange}%</strong> since last{' '}
                {periodLabel}
            </p>
        );
    };

    const CategoryChange = () => {
        if (!topCategoryChange || Number(period) > 30 || period === 'all') return null;

        if (topCategory === topCategoryChange) {
            return <p className="stat-box__change">Same as previous {periodLabel}</p>;
        }

        return (
            <p className="stat-box__change">
                Changed from <strong>{topCategoryChange}</strong> last {periodLabel}
            </p>
        );
    };

    return (
        <div className="dashboard__stats">
            <div className="dashboard-section stat-box">
                <div className="stat-box__title">
                    <h3>Total expenses</h3>
                    <div className="stat-icon">
                        <ShoppingCartIcon width={35} height={35} />
                    </div>
                </div>
                <p className="stat-box__result">${totalAmount}</p>
                <AmountChange />
            </div>
            <div className="dashboard-section stat-box">
                <div className="stat-box__title">
                    <h3>Top category</h3>
                    <div className="stat-icon">
                        <CollectionIcon width={35} height={35} />
                    </div>
                </div>
                <p className="stat-box__result">{topCategory}</p>
                <CategoryChange />
            </div>
        </div>
    );
};

export default DashboardStats;
