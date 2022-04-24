import { ArrowCircleDownIcon, ArrowCircleUpIcon, MinusCircleIcon } from '@heroicons/react/solid';
import { useDashboardStats } from 'hooks/useDashboardStats';
import React from 'react';
import variables from 'styles/base/_settings.module.scss';

const DashboardAmountChange = ({ period }) => {
    const { totalAmountChange } = useDashboardStats(period);

    if (!totalAmountChange || Number(period) > 31 || period === 'all') return null;

    // change color and icon based on percentage change
    const changeStyle = { backgroundColor: variables.grey };
    let changeIcon = <MinusCircleIcon width={20} height={20} />;
    if (Math.sign(totalAmountChange) === 1) {
        changeStyle.backgroundColor = variables.red;
        changeIcon = <ArrowCircleUpIcon width={20} height={20} />;
    } else if (Math.sign(totalAmountChange) === -1) {
        changeStyle.backgroundColor = variables.green;
        changeIcon = <ArrowCircleDownIcon width={20} height={20} />;
    }

    return (
        <div className="total-amount-change" style={changeStyle}>
            {changeIcon}
            {totalAmountChange}%
        </div>
    );
};

export default DashboardAmountChange;
