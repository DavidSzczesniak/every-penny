import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@heroicons/react/solid';
import { Select, Table, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { categories, tableHeadings } from 'config/expensesConfig';
import { ExpensesContext } from 'context/expensesContext';
import dayjs from 'dayjs';
import { useSortableData } from 'hooks/useSortableData';
import { useTableFilters } from 'hooks/useTableFilters';
import React, { useContext } from 'react';

const ExpenseListTable = ({ setCurrentExpense }) => {
    const { state: expensesState } = useContext(ExpensesContext);
    const {
        filteredData,
        searchValue,
        dateRangeValue,
        categoryValue,
        filterByTitle,
        filterByCategory,
        filterByDateRange,
    } = useTableFilters(expensesState);
    const { sortedData, sortConfig, handleSort } = useSortableData(filteredData);

    const getSortIcon = () => {
        if (sortConfig.direction === 'ascending') {
            return <ChevronUpIcon />;
        }

        if (sortConfig.direction === 'descending') {
            return <ChevronDownIcon />;
        }

        return null;
    };

    const TableHeading = ({ prop, label }) => (
        <th onClick={() => handleSort(prop)}>
            <span>{label}</span>
            {sortConfig.key === prop && getSortIcon()}
        </th>
    );
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
            <Table className="expenses-list__table" highlightOnHover striped>
                <thead>
                    <tr>
                        {tableHeadings.map((heading) => (
                            <TableHeading
                                key={heading.prop}
                                prop={heading.prop}
                                label={heading.label}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((expense) => (
                        <tr
                            key={expense.id}
                            onClick={() => {
                                setCurrentExpense(expense);
                            }}>
                            <td>{dayjs(expense.createdAt).format('DD/MM/YYYY')}</td>
                            <td>{expense.title}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {!sortedData.length && <p className="no-expenses-msg">No expenses found</p>}
        </div>
    );
};

export default ExpenseListTable;
