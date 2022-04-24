import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExpensesContext } from 'context/expensesContext';
import Dashboard from 'components/Dashboard';
import React from 'react';
import { mockExpenses } from '../../__mocks__/expenses';
import '../../__mocks__/ResizeObserver';

const mockDispatch = jest.fn();
const renderComponent = (defaultExpenses = mockExpenses) => {
    const defaults = {
        allExpenses: defaultExpenses,
        textFilter: '',
        dateRangeFilter: [null, null],
        categoryFilter: '',
        dispatch: mockDispatch,
    };
    render(
        <ExpensesContext.Provider value={{ ...defaults }}>
            <Dashboard />
        </ExpensesContext.Provider>
    );
};

jest.mock('react-chartjs-2', () => ({
    Bar: () => null,
}));

it('should render with basic props', () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: 'Total expenses' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Allocation' })).toBeInTheDocument();
});

it('should render no data screen', () => {
    renderComponent([]);
    expect(screen.getByRole('img', { name: 'magnifying glass' })).toBeInTheDocument();
    expect(
        screen.getByRole('heading', { name: "Looks like you haven't added any expenses!" })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go there' })).toBeInTheDocument();
});

it('should dispatch date filter', async () => {
    renderComponent();

    userEvent.click(screen.getByRole('textbox', { name: 'Select time period' }));
    userEvent.click(screen.getByRole('option', { name: 'Week' }));
    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SET_DATE_RANGE_FILTER',
            filter: expect.any(Array),
        });
    });
});
