import { useMemo } from 'react';
import { getRandomColor } from 'utils/utils';
import { useFilteredExpenses } from './useFilteredExpenses';

export const useDashboardStats = () => {
    const expenses = useFilteredExpenses();

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
            const totalAllocation = newAllocation.reduce((a, b) => ({
                allocation: a.allocation + b.allocation,
            })).allocation;

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
        totalAmount,
        topCategory,
        categoryAllocation,
    };
};
