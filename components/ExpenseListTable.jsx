import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { Pagination, Select, Table } from '@mantine/core';
import { tableHeadings } from 'config/expensesConfig';
import dayjs from 'dayjs';
import { useSortableData } from 'hooks/useSortableData';
import React, { useState } from 'react';

const ExpenseListTable = ({ expenses, setCurrentExpense }) => {
    const { sortedData, sortConfig, handleSort } = useSortableData(expenses);
    const [activePage, setPage] = useState(1);
    const [tableRows, setTableRows] = useState(10);
    const indexOfLastExpense = activePage * tableRows;
    const indexOfFirstExpense = indexOfLastExpense - tableRows;
    const paginatedExpenses = sortedData.slice(indexOfFirstExpense, indexOfLastExpense);

    const getSortIcon = () => {
        if (sortConfig.direction === 'ascending') {
            return <ChevronUpIcon />;
        }

        if (sortConfig.direction === 'descending') {
            return <ChevronDownIcon />;
        }

        return null;
    };

    return (
        <>
            <div style={{ width: '100%', overflow: 'auto' }}>
                <Table className="expenses-list__table" highlightOnHover striped>
                    <thead>
                        <tr>
                            {tableHeadings.map((heading) => (
                                <th key={heading.prop} onClick={() => handleSort(heading.prop)}>
                                    <span>{heading.label}</span>
                                    {sortConfig.key === heading.prop && getSortIcon()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedExpenses.map((expense) => (
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
            </div>
            <div className="expenses-list__pagination">
                <Select
                    aria-label="Select table row amount"
                    data={[
                        { value: '10', label: '10 rows' },
                        { value: '20', label: '20 rows' },
                        { value: '50', label: '50 rows' },
                        { value: '100', label: '100 rows' },
                    ]}
                    value={tableRows.toString()}
                    onChange={(value) => setTableRows(Number(value))}
                />
                <Pagination
                    total={Math.ceil(sortedData.length / tableRows)}
                    page={activePage}
                    onChange={setPage}
                />
            </div>
            {!sortedData.length && <p className="no-expenses-msg">No expenses found</p>}
        </>
    );
};

export default ExpenseListTable;
