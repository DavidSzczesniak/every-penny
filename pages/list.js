import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@heroicons/react/solid';
import { Select, Table, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import PageWrapper from 'components/PageWrapper';
import { categories, tableHeadings } from 'config/expensesConfig';
import { ExpensesContext } from 'context/expensesContext';
import dayjs from 'dayjs';
import { useSortableData } from 'hooks/useSortableData';
import React, { useContext, useEffect } from 'react';
import { mockExpenses } from 'tests/mocks/expenses';

const ExpensesList = () => {
    const { state: expensesState, dispatch } = useContext(ExpensesContext);
    const { sortedData, handleSort, sortConfig } = useSortableData(expensesState);

    useEffect(() => {
        dispatch({ type: 'SET_EXPENSES', expenses: mockExpenses });
    }, [dispatch]);

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
        <PageWrapper title="Expenses List">
            <div className="expenses-list">
                <div className="expenses-list__filters">
                    <TextInput
                        icon={<SearchIcon width={15} height={15} />}
                        aria-label="Search"
                        placeholder="Search"
                    />
                    <DateRangePicker
                        placeholder="Pick a date range"
                        aria-label="Date range filter"
                    />
                    <Select
                        aria-label="Select category"
                        placeholder="Select category"
                        data={categories}
                        clearable
                        clearButtonLabel="Clear select field"
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
                        {sortedData.map((element) => (
                            <tr key={element.title}>
                                <td>{dayjs(element.date).format('DD/MM/YYYY')}</td>
                                <td>{element.title}</td>
                                <td>{element.amount}</td>
                                <td>{element.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {!sortedData.length > 0 && <p className="no-expenses-msg">No expenses found</p>}
            </div>
        </PageWrapper>
    );
};

export default ExpensesList;
