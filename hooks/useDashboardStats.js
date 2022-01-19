import { periodOptions } from 'config/dashboardConfig';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { useEffect, useMemo, useState } from 'react';
import { getRandomColor } from 'utils/utils';
import { useFilteredExpenses } from './useFilteredExpenses';
import { useFilters } from './useFilters';
dayjs.extend(quarterOfYear);

export const useDashboardStats = () => {
    const { filterByDateRange } = useFilters();
    const expenses = useFilteredExpenses();
    const [period, setPeriod] = useState('30');

    useEffect(() => {
        let selectedPeriod = periodOptions.find((x) => x.value === period).value;

        if (selectedPeriod === 'all') {
            filterByDateRange([null, null]);
        } else {
            let periodUnit = 'month';
            if (selectedPeriod === '7') {
                periodUnit = 'week';
            } else if (selectedPeriod === '90') {
                periodUnit = 'quarter';
            } else if (selectedPeriod === '365') {
                periodUnit = 'year';
            }
            // @ts-ignore
            const startDate = dayjs().startOf(periodUnit);
            // @ts-ignore
            const endDate = dayjs().endOf(periodUnit);
            filterByDateRange([startDate, endDate]);
        }
    }, [period]);

    const totalAmount = useMemo(() => {
        let newTotal = 0;
        if (expenses.length > 0) {
            newTotal = expenses.reduce((a, b) => ({
                amount: a.amount + b.amount,
            })).amount;
        }

        return newTotal;
    }, [expenses]);

    const topCategory = useMemo(() => {
        let newTop = { name: 'n/a', occurences: 0 };
        if (expenses.length > 0) {
            const occurences = getCategoryOccurences(expenses);

            for (const [key, value] of Object.entries(occurences)) {
                if (value > newTop.occurences) {
                    newTop.name = key;
                    newTop.occurences = value;
                }
            }
        }

        return newTop;
    }, [expenses]);

    const categoryAllocation = useMemo(() => {
        let newAllocation = [];
        if (expenses.length > 0) {
            const occurences = getCategoryOccurences(expenses);

            for (const [key, value] of Object.entries(occurences)) {
                const percentage = (value / expenses.length) * 100;
                newAllocation = [
                    ...newAllocation,
                    {
                        name: key,
                        allocation: Number(percentage.toFixed(2)),
                        color: getRandomColor(),
                    },
                ];
            }

            // assign leftover percentage
            const leftOver = newAllocation.reduce((a, b) => ({
                allocation: a.allocation + b.allocation,
            })).allocation;

            newAllocation = [
                ...newAllocation,

                {
                    name: 'none',
                    allocation: Number((100 - leftOver).toFixed(2)),
                    color: getRandomColor(),
                },
            ];
        }

        return newAllocation;
    }, [expenses]);

    function getCategoryOccurences(expenses) {
        const occurences = {};
        expenses.forEach((expense) => {
            if (expense.category) {
                occurences[expense.category] = (occurences[expense.category] || 0) + 1;
            }
        });

        return occurences;
    }

    return {
        period,
        setPeriod,
        totalAmount,
        topCategory,
        categoryAllocation,
    };
};
