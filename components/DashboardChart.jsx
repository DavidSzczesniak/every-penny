import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { useChartData } from 'hooks/useChartData';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = ({ period }) => {
    const chartData = useChartData(period);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="dashboard-section">
            <h3>Expenditure over the time period</h3>
            <Bar options={options} data={chartData} />
        </div>
    );
};

export default DashboardChart;
