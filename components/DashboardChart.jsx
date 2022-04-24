import { Select } from '@mantine/core';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { periodOptions } from 'config/dashboardConfig';
import { useChartData } from 'hooks/useChartData';
import { useDashboardStats } from 'hooks/useDashboardStats';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import DashboardAmountChange from './DashboardAmountChange';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = ({ period, setPeriod }) => {
    const { totalAmount } = useDashboardStats(period);

    const chartData = useChartData(period);
    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <div className="dashboard-section">
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <div className="stat-box__title">
                    <h3>Total expenses</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="stat-box__result">${totalAmount}</div>
                        <DashboardAmountChange period={period} />
                    </div>
                </div>
                <Select
                    aria-label="Select time period"
                    data={periodOptions}
                    value={period}
                    onChange={(value) => setPeriod(value)}
                />
            </div>
            <Bar options={options} data={chartData} />
        </div>
    );
};

export default DashboardChart;
