import { createContext } from 'react';

export const initialExpensesState = {
    allExpenses: [],
    textFilter: '',
    dateRangeFilter: [null, null],
    categoryFilter: '',
};

export const ExpensesContext = createContext(initialExpensesState);

export const expensesReducer = (state = initialExpensesState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return { ...state, allExpenses: [...state.allExpenses, action.expense] };
        case 'REMOVE_EXPENSE':
            return {
                ...state,
                allExpenses: state.allExpenses.filter(({ id }) => id !== action.id),
            };
        case 'EDIT_EXPENSE':
            const allExpenses = state.allExpenses.map((expense) => {
                if (expense.id === action.id) {
                    return { ...expense, ...action.updates };
                }
                return expense;
            });
            return { ...state, allExpenses };
        case 'SET_EXPENSES':
            return { ...state, allExpenses: action.expenses };
        default:
            return state;
    }
};

export const filtersReducer = (state = initialExpensesState, action) => {
    const { type, filter } = action;
    switch (type) {
        case 'SET_TEXT_FILTER':
            return { ...state, textFilter: filter };
        case 'SET_DATE_RANGE_FILTER':
            return { ...state, dateRangeFilter: filter };
        case 'SET_CATEGORY_FILTER':
            return { ...state, categoryFilter: filter };
        default:
            return state;
    }
};
