import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import ExpenseModal from 'components/ExpenseModal';
import React from 'react';
import { mockExpenses } from '../../__mocks__/expenses';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

const expenseData = mockExpenses[0];
const mockFn = () => jest.fn();

it('should render the basic fields', () => {
    render(<ExpenseModal opened={true} setOpened={mockFn} onSubmit={mockFn} />);

    expect(screen.getByRole('heading', { name: /Add New Expense/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Title \*/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Amount \*/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Date/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Select category/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Note/ })).toBeInTheDocument();
    // only renders Save button
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
});

it('should render with given expense data', () => {
    render(
        <ExpenseModal
            opened={true}
            setOpened={mockFn}
            onSubmit={mockFn}
            expenseData={expenseData}
        />
    );

    expect(screen.getByRole('heading', { name: /Edit Expense/ })).toBeInTheDocument();
    expect(screen.getByDisplayValue(expenseData.title)).toBeInTheDocument();
    const formattedDate = dayjs(expenseData.createdAt).format('MMMM D, YYYY');
    expect(screen.getByDisplayValue(formattedDate)).toBeInTheDocument();
    const formattedAmount = expenseData.amount.toString() + '.00';
    expect(screen.getByDisplayValue(formattedAmount)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expenseData.category)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expenseData.note)).toBeInTheDocument();
    // renders both save and remove button
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
});

it('should validate form fields', () => {
    const onSubmit = jest.fn();
    render(<ExpenseModal opened={true} setOpened={mockFn} onSubmit={onSubmit} />);

    userEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText('Amount is required and should be a number')).toBeInTheDocument();
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
});

it('should submit correct form data', () => {
    const onSubmit = jest.fn();
    render(<ExpenseModal opened={true} setOpened={mockFn} onSubmit={onSubmit} />);
    const inputData = {
        title: 'Rent',
        amount: 1095,
        category: '',
        note: 'My note',
    };

    userEvent.type(screen.getByRole('textbox', { name: /title \*/i }), inputData.title);
    fireEvent.input(screen.getByRole('textbox', { name: /amount \*/i }), {
        target: { value: inputData.amount },
    });
    userEvent.type(screen.getByRole('textbox', { name: /note/i }), inputData.note);
    userEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledWith({ ...inputData, createdAt: expect.any(Date) });
});

it('should call Remove function', () => {
    const onRemove = jest.fn();
    render(
        <ExpenseModal
            opened={true}
            setOpened={mockFn}
            onSubmit={mockFn}
            onRemove={onRemove}
            expenseData={expenseData}
        />
    );

    userEvent.click(screen.getByRole('button', { name: /remove/i }));

    expect(onRemove).toHaveBeenCalled();
});
