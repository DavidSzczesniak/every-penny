import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpenseList from 'components/ExpenseList';
import { ExpensesContext } from 'context/expensesContext';
import React from 'react';
import { mockExpenses } from '../../__mocks__/expenses';
import '../../__mocks__/ResizeObserver';

const mockDispatch = jest.fn();
const renderComponent = () => {
    const defaults = {
        allExpenses: mockExpenses,
        textFilter: '',
        dateRangeFilter: [null, null],
        categoryFilter: '',
        dispatch: mockDispatch,
    };
    render(
        <ExpensesContext.Provider value={{ ...defaults }}>
            <ExpenseList setCurrentExpense={() => {}} />
        </ExpensesContext.Provider>
    );
};

it('should render with basic props', () => {
    renderComponent();

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Date range filter' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Select category' })).toBeInTheDocument();
});

// it('should render the loading spinner', () => {
//     renderComponent(true);

//     expect(screen.getByRole('img', { name: 'loading spinner' })).toBeInTheDocument();
//     expect(screen.queryByRole('table')).not.toBeInTheDocument();
// });

it('should dispatch text filter', () => {
    renderComponent();
    const searchString = 'headphones';

    userEvent.type(screen.getByRole('textbox', { name: 'Search' }), searchString);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_TEXT_FILTER', filter: searchString });
});

it('should filter by category', async () => {
    renderComponent();
    const searchOption = 'Electronics';

    userEvent.click(screen.getByRole('textbox', { name: 'Select category' }));
    userEvent.click(screen.getByRole('option', { name: searchOption }));
    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SET_CATEGORY_FILTER',
            filter: searchOption,
        });
    });
});
