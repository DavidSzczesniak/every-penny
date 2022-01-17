import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import variables from 'styles/base/_settings.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: variables.green,
                borderColor: variables.green,
                borderWidth: 1,
                borderRadius: { topLeft: 6, topRight: 6 },
                data: [65, 10, 5, 2, 20, 30, 45],
                maxBarThickness: 60,
            },
        ],
    };

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
            <Bar options={options} data={data} />
        </div>
    );
};

export default DashboardChart;
