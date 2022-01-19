import { ExpensesContext } from 'context/expensesContext';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useContext } from 'react';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const useFilteredExpenses = () => {
    const { allExpenses, textFilter, categoryFilter, dateRangeFilter } =
        useContext(ExpensesContext);

    return [...allExpenses].filter((expense) => {
        // filter by date
        let dateRangeMatch = true;
        if (dateRangeFilter?.[0] && dateRangeFilter?.[1]) {
            const createdAt = dayjs(expense.createdAt);
            const startDate = dayjs(dateRangeFilter[0]);
            const endDate = dayjs(dateRangeFilter[1]);
            const startDateMatch = startDate.isSameOrBefore(createdAt, 'day');
            const endDateMatch = endDate.isSameOrAfter(createdAt, 'day');
            dateRangeMatch = startDateMatch && endDateMatch;
        }

        // filter by category
        const categoryMatch = categoryFilter ? expense.category === categoryFilter : true;

        // filter by text
        const textMatch = expense.title.toLowerCase().includes(textFilter);

        return dateRangeMatch && categoryMatch && textMatch;
    });
};
