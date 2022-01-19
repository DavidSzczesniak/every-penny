import { ExpensesContext } from 'context/expensesContext';
import { useContext, useState } from 'react';

export const useFilters = () => {
    const { dispatch } = useContext(ExpensesContext);
    const [searchValue, setSearchValue] = useState('');
    const [dateRangeValue, setDateRange] = useState(undefined);
    const [categoryValue, setCategory] = useState('');

    const filterByTitle = (value) => {
        const filter = value.toLowerCase().trim() || '';

        dispatch({ type: 'SET_TEXT_FILTER', filter });
        setSearchValue(filter);
    };

    const filterByDateRange = (value) => {
        let filter = undefined;

        if (value[0] && value[1]) {
            filter = value;
        }
        dispatch({ type: 'SET_DATE_RANGE_FILTER', filter });
        setDateRange(filter);
    };

    const filterByCategory = (value) => {
        const filter = value || undefined;

        dispatch({ type: 'SET_CATEGORY_FILTER', filter });
        setCategory(filter);
    };

    return {
        searchValue,
        dateRangeValue,
        categoryValue,
        filterByTitle,
        filterByDateRange,
        filterByCategory,
    };
};
