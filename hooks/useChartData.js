import dayjs from 'dayjs';
import { useFilteredExpenses } from 'hooks/useFilteredExpenses';
import { useMemo } from 'react';
import variables from 'styles/base/_settings.module.scss';
import { getDateRange } from 'utils/helpers';

export const useChartData = (period) => {
    const expenses = useFilteredExpenses();
    let { startDate, endDate } = getDateRange(period);

    const chartData = useMemo(() => {
        let dateFormat = 'MMM DD';
        if (Number(period) > 364 || period === 'all') {
            dateFormat = 'MMM DD YYYY';
        }
        // generate labels based on date range
        if (startDate === null) {
            // create 'all time' start and end dates
            const allDates = expenses.map((expense) => expense.createdAt);
            startDate = dayjs(Math.min(...allDates));
            endDate = dayjs(Math.max(...allDates));
        }
        const diff = endDate.diff(startDate, 'day');
        let currentIterationDate = dayjs(startDate).format(dateFormat);

        const expenseObj = {};
        expenseObj[currentIterationDate] = 0;
        for (let i = 0; i < diff; i++) {
            currentIterationDate = dayjs(currentIterationDate).add(1, 'day').format(dateFormat);
            expenseObj[currentIterationDate] = 0;
        }

        // fill in amount for each date
        expenses.forEach((expense) => {
            const formattedDate = dayjs(expense.createdAt).format(dateFormat);
            expenseObj[formattedDate] = expenseObj[formattedDate] + expense.amount;
        });

        return { labels: Object.keys(expenseObj), data: Object.values(expenseObj) };
    }, [endDate, expenses, startDate]);

    const data = useMemo(
        () => ({
            labels: chartData.labels,
            datasets: [
                {
                    backgroundColor: variables.green,
                    borderColor: variables.green,
                    borderWidth: 1,
                    borderRadius: { topLeft: 6, topRight: 6 },
                    data: chartData.data,
                    maxBarThickness: 60,
                },
            ],
        }),
        [chartData]
    );

    return data;
};
