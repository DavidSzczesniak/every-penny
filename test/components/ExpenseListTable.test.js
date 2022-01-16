import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpenseListTable from 'components/ExpenseListTable';
import React from 'react';
import { mockExpenses } from '../../__mocks__/expenses';
import '../../__mocks__/ResizeObserver';

it('should render with basic props', () => {
    render(<ExpenseListTable expenses={mockExpenses} setCurrentExpense={() => {}} />);

    expect(screen.getByRole('columnheader', { name: /Date/ })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Title/ })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Amount/ })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Category/ })).toBeInTheDocument();
    // pagination renders correctly
    expect(screen.getByRole('button', { name: /2/ })).toBeInTheDocument();
});

it('should set the current expense when one is clicked', () => {
    const setCurrentExpense = jest.fn();
    render(<ExpenseListTable expenses={mockExpenses} setCurrentExpense={setCurrentExpense} />);

    // index 1 to ignore table header
    userEvent.click(screen.getAllByRole('row')[1]);
    expect(setCurrentExpense).toHaveBeenCalledWith(mockExpenses[0]);
});

it('should sort rows when a column header is clicked', () => {
    render(<ExpenseListTable expenses={mockExpenses} setCurrentExpense={() => {}} />);

    expect(screen.getAllByRole('cell')[1]).toHaveTextContent(mockExpenses[0].title);
    userEvent.click(screen.getByRole('columnheader', { name: /Date/ }));
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent(mockExpenses[4].title);
});

it('should display more expenses when larger row amount selected', async () => {
    render(<ExpenseListTable expenses={mockExpenses} setCurrentExpense={() => {}} />);

    expect(screen.getAllByRole('row').length).toBe(11);
    userEvent.click(screen.getByRole('textbox', { name: /Select table row amount/ }));
    userEvent.click(screen.getByRole('option', { name: /20 rows/ }));
    const allTableRows = await screen.findAllByRole('row');
    expect(allTableRows.length).toBe(12);
});

it('should display expenses on next page', () => {
    render(<ExpenseListTable expenses={mockExpenses} setCurrentExpense={() => {}} />);

    expect(screen.getAllByRole('row').length).toBe(11);
    userEvent.click(screen.getByRole('button', { name: /2/ }));
    expect(screen.getAllByRole('row').length).toBe(2);
});
