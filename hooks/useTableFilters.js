import dayjs from 'dayjs';
import { useState } from 'react';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const useTableFilters = (data) => {
    const [searchValue, setSearchValue] = useState('');
    const [dateRangeValue, setDateRange] = useState(undefined);
    const [categoryValue, setCategory] = useState('');

    const filterByTitle = (value) => {
        const filterString = value.toLowerCase().trim();

        if (filterString) {
            setSearchValue(filterString);
        } else {
            setSearchValue('');
        }
    };

    const filterByDateRange = (value) => {
        if (value[0] && value[1]) {
            setDateRange(value);
        } else {
            setDateRange(undefined);
        }
    };

    const filterByCategory = (value) => {
        if (value) {
            setCategory(value);
        } else {
            setCategory(undefined);
        }
    };

    const filteredData = [...data].filter((expense) => {
        // filter by date
        let dateRangeMatch = true;
        if (dateRangeValue) {
            const expenseDate = dayjs(expense.date);
            const startDate = dayjs(dateRangeValue[0]);
            const endDate = dayjs(dateRangeValue[1]);
            const startDateMatch = startDate.isSameOrBefore(expenseDate, 'day');
            const endDateMatch = endDate.isSameOrAfter(expenseDate, 'day');
            dateRangeMatch = startDateMatch && endDateMatch;
        }

        // filter by category
        const categoryMatch = categoryValue ? expense.category === categoryValue : true;

        // filter by text
        const textMatch = expense.title.toLowerCase().includes(searchValue);

        return dateRangeMatch && categoryMatch && textMatch;
    });

    return {
        filteredData,
        searchValue,
        dateRangeValue,
        categoryValue,
        filterByTitle,
        filterByDateRange,
        filterByCategory,
    };
};
