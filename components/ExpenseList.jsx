import { SearchIcon } from '@heroicons/react/solid';
import { Select, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { categories } from 'config/expensesConfig';
import { useFilteredExpenses } from 'hooks/useFilteredExpenses';
import { useFilters } from 'hooks/useFilters';
import React, { useEffect } from 'react';
import ExpenseListTable from './ExpenseListTable';

const ExpenseList = ({ setCurrentExpense }) => {
    const {
        searchValue,
        dateRangeValue,
        categoryValue,
        filterByTitle,
        filterByCategory,
        filterByDateRange,
    } = useFilters();
    const allExpenses = useFilteredExpenses();

    useEffect(() => {
        filterByDateRange([null, null]);
    }, []);

    return (
        <div className="expenses-list">
            <div className="expenses-list__filters">
                <TextInput
                    icon={<SearchIcon width={15} height={15} />}
                    aria-label="Search"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => filterByTitle(e.target.value)}
                />
                <DateRangePicker
                    placeholder="Pick a date range"
                    aria-label="Date range filter"
                    value={dateRangeValue}
                    onChange={(value) => filterByDateRange(value)}
                />
                <Select
                    aria-label="Select category"
                    placeholder="Select category"
                    data={categories}
                    clearable
                    clearButtonLabel="Clear select field"
                    value={categoryValue}
                    onChange={(value) => filterByCategory(value)}
                />
            </div>
            <ExpenseListTable expenses={allExpenses} setCurrentExpense={setCurrentExpense} />
        </div>
    );
};

export default ExpenseList;
