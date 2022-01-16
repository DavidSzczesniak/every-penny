import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpenseList from 'components/ExpenseList';
import React from 'react';
import { mockExpenses } from '../../__mocks__/expenses';
import '../../__mocks__/ResizeObserver';

const renderComponent = (isLoading = false) => {
    render(
        <ExpenseList expenses={mockExpenses} setCurrentExpense={() => {}} isLoading={isLoading} />
    );
};

it('should render with basic props', () => {
    renderComponent();

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Date range filter' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Select category' })).toBeInTheDocument();
});

it('should render the loading spinner', () => {
    renderComponent(true);

    expect(screen.getByRole('img', { name: 'loading spinner' })).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
});

it('should filter by title', () => {
    renderComponent();

    expect(screen.getAllByRole('row').length).toBe(11);
    userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'Headphones');
    expect(screen.getAllByRole('row').length).toBe(2);
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent(mockExpenses[2].title);
});

it('should filter by category', async () => {
    renderComponent();

    expect(screen.getAllByRole('row').length).toBe(11);
    userEvent.click(screen.getByRole('textbox', { name: 'Select category' }));
    userEvent.click(screen.getByRole('option', { name: 'Electronics' }));
    const allTableRows = await screen.findAllByRole('row');
    expect(allTableRows.length).toBe(2);
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent(mockExpenses[2].title);
});
