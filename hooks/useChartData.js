import dayjs from 'dayjs';
import { useFilteredExpenses } from 'hooks/useFilteredExpenses';
import { useMemo } from 'react';
import { getDateRange } from 'utils/helpers';
import { getRandomColor } from 'utils/utils';

export const useChartData = (period) => {
    const expenses = useFilteredExpenses();
    let { startDate, endDate } = getDateRange(period);
    let dateFormat = 'MMM DD';
    if (Number(period) > 364 || period === 'all') dateFormat = 'MMM DD YYYY';

    const chartData = useMemo(() => {
        // creates empty dataset based on the period selected
        const createEmptyChartData = () => {
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

            return expenseObj;
        };
        const expenseObj = createEmptyChartData();

        const dataByCategory = [];
        expenses.forEach((expense) => {
            const category = expense.category;
            if (!dataByCategory.find((cat) => cat.label === category)) {
                dataByCategory.push({
                    label: category,
                    data: { ...expenseObj },
                    backgroundColor: getRandomColor(),
                    maxBarThickness: 60,
                });
            }
            const data = dataByCategory.find((cat) => cat.label === category).data;
            const date = dayjs(expense.createdAt).format(dateFormat);
            data[date] += expense.amount;
        });

        dataByCategory.forEach((cat) => {
            cat.data = Object.values(cat.data);
        });

        return { labels: Object.keys(expenseObj), data: dataByCategory };
    }, [dateFormat, expenses]);

    const data = useMemo(
        () => ({
            labels: chartData.labels,
            datasets: chartData.data,
        }),
        [chartData]
    );

    return data;
};
