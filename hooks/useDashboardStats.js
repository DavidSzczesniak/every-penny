import { ExpensesContext } from 'context/expensesContext';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useMemo } from 'react';
import { useContext } from 'react/cjs/react.development';
import { getDateRange } from 'utils/helpers';
import { getRandomColor } from 'utils/utils';
import { useFilteredExpenses } from './useFilteredExpenses';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const useDashboardStats = (period) => {
    const filteredExpenses = useFilteredExpenses();
    const { allExpenses } = useContext(ExpensesContext);

    const totalAmount = useMemo(() => {
        if (filteredExpenses.length < 1) return 0;

        return getArrayPropTotal(filteredExpenses, 'amount');
    }, [filteredExpenses]);

    const totalAmountChange = useMemo(() => {
        const previousExpenses = getPreviousPeriodExpenses();
        if (previousExpenses.length < 1) return null;

        const previousTotal = getArrayPropTotal(previousExpenses, 'amount');
        const totalChange = ((totalAmount - previousTotal) / previousTotal) * 100;

        return Number(totalChange.toFixed(2));
    }, [totalAmount]);

    const topCategory = useMemo(() => {
        let newTop = { name: 'n/a', occurences: 0 };
        if (filteredExpenses.length > 0) {
            const occurences = getCategoryOccurences(filteredExpenses);

            for (const [key, value] of Object.entries(occurences)) {
                if (value > newTop.occurences) {
                    newTop.name = key;
                    newTop.occurences = value;
                }
            }
        }

        return newTop.name;
    }, [filteredExpenses]);

    const topCategoryChange = useMemo(() => {
        const previousExpenses = getPreviousPeriodExpenses();
        if (previousExpenses.length < 1) return null;

        let newTop = { name: 'n/a', occurences: 0 };
        const occurences = getCategoryOccurences(previousExpenses);

        for (const [key, value] of Object.entries(occurences)) {
            if (value > newTop.occurences) {
                newTop.name = key;
                newTop.occurences = value;
            }
        }

        return newTop.name;
    }, []);

    const categoryAllocation = useMemo(() => {
        let newAllocation = [];
        if (filteredExpenses.length > 0) {
            const occurences = getCategoryOccurences(filteredExpenses);

            for (const [key, value] of Object.entries(occurences)) {
                const percentage = (value / filteredExpenses.length) * 100;
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
            const totalAllocation = getArrayPropTotal(newAllocation, 'allocation');

            if (100 - totalAllocation >= 1) {
                newAllocation = [
                    ...newAllocation,
                    {
                        name: 'none',
                        allocation: Number((100 - totalAllocation).toFixed(2)),
                        color: getRandomColor(),
                    },
                ];
            }
        }

        return newAllocation;
    }, [filteredExpenses]);

    function getArrayPropTotal(array, prop) {
        return array.reduce((a, b) => ({
            [prop]: a[prop] + b[prop],
        }))[prop];
    }

    function getPreviousPeriodExpenses() {
        if (allExpenses.length < 1) return [];

        const { startDate, endDate } = getDateRange(period);
        const subtractDays = Number(period);
        const previousStart = dayjs(startDate).subtract(subtractDays, 'day');
        const previousEnd = dayjs(endDate).subtract(subtractDays, 'day');

        return allExpenses.filter((expense) => {
            const createdAt = dayjs(expense.createdAt);
            const startDateMatch = previousStart.isSameOrBefore(createdAt, 'day');
            const endDateMatch = previousEnd.isSameOrAfter(createdAt, 'day');

            return startDateMatch && endDateMatch;
        });
    }

    function getCategoryOccurences(filteredExpenses) {
        const occurences = {};
        filteredExpenses.forEach((expense) => {
            if (expense.category) {
                occurences[expense.category] = (occurences[expense.category] || 0) + 1;
            }
        });

        return occurences;
    }

    return {
        totalAmount,
        totalAmountChange,
        topCategory,
        topCategoryChange,
        categoryAllocation,
    };
};
