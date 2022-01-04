import { SearchIcon } from '@heroicons/react/solid';
import { Select, Table, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import PageWrapper from 'components/PageWrapper';
import React from 'react';

const ExpensesList = () => {
    // temporary dummy data
    const elements = [
        { date: '23/12/21', name: 'Rent', amount: 1095, category: 'Bills', note: 'same as always' },
        { date: '12/12/21', name: 'Food Shop', amount: 135.32, category: 'Food', note: '' },
        {
            date: '02/05/21',
            name: 'Headphones',
            amount: 69.99,
            category: 'Electronics',
            note: 'very cool',
        },
        {
            date: '09/08/21',
            name: 'Water bill',
            amount: 55.29,
            category: 'Bills',
            note: 'same as always',
        },
        {
            date: '31/12/20',
            name: 'Power bill',
            amount: 64.98,
            category: 'Bills',
            note: 'same as always',
        },
    ];

    const TableHeadingsList = [
        {
            prop: 'date',
            label: 'Date',
        },
        {
            prop: 'name',
            label: 'Name',
        },
        {
            prop: 'amount',
            label: 'Amount',
        },
        {
            prop: 'category',
            label: 'Category',
        },
        {
            prop: 'note',
            label: 'Note',
        },
    ];

    const TableHeading = ({ label }) => (
        <th>
            <span>{label}</span>
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
                        data={[
                            { value: 'bills', label: 'Bills' },
                            { value: 'electronics', label: 'Electronics' },
                            { value: 'food', label: 'Food' },
                            { value: 'entertainment', label: 'Entertainment' },
                        ]}
                        clearable
                        clearButtonLabel="Clear select field"
                    />
                </div>
                <Table className="expenses-list__table" highlightOnHover striped>
                    <thead>
                        <tr>
                            {TableHeadingsList.map((heading) => (
                                <TableHeading
                                    key={heading.prop}
                                    prop={heading.prop}
                                    label={heading.label}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {elements.map((element) => (
                            <tr key={element.name}>
                                <td>{element.date}</td>
                                <td>{element.name}</td>
                                <td>{element.amount}</td>
                                <td>{element.category}</td>
                                <td>{element.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </PageWrapper>
    );
};

export default ExpensesList;
