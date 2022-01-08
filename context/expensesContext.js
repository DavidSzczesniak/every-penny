import { database } from 'config/firebase';
import dayjs from 'dayjs';
import { child, push, ref, remove, update } from 'firebase/database';
import { createContext } from 'react';

export const initialExpensesState = [];

export const addExpense = (expenseData, uid) => {
    const newExpense = {
        ...expenseData,
        createdAt: dayjs(expenseData.createdAt).valueOf(),
    };

    const newExpenseId = push(child(ref(database), `users/${uid}/expenses`)).key;
    update(ref(database), { [`users/${uid}/expenses/${newExpenseId}`]: newExpense });

    return { type: 'ADD_EXPENSE', expense: { id: newExpenseId, ...newExpense } };
};

export const removeExpense = (id, uid) => {
    remove(ref(database, `users/${uid}/expenses/${id}`));

    return { type: 'REMOVE_EXPENSE', id };
};

export const editExpense = (id, updates, uid) => {
    const updatedExpense = {
        createdAt: dayjs(updates.createdAt).valueOf(),
        ...updates,
    };
    delete updatedExpense.id;

    update(ref(database), { [`users/${uid}/expenses/${id}`]: updatedExpense });

    return { type: 'EDIT_EXPENSE', id, updates };
};

export const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return { ...expense, ...action.updates };
                }
                return expense;
            });
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};

export const ExpensesContext = createContext({
    state: initialExpensesState,
    dispatch: ({}) => {},
});
