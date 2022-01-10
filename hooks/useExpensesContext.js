import { database } from 'config/firebase';
import { useAuth } from 'context/auth';
import { ExpensesContext } from 'context/expensesContext';
import dayjs from 'dayjs';
import { child, push, ref, remove, update } from 'firebase/database';
import { useContext } from 'react';

export const useExpensesContext = () => {
    const { user } = useAuth();
    const { dispatch } = useContext(ExpensesContext);

    const addExpense = (expenseData) => {
        const newExpense = {
            ...expenseData,
            createdAt: dayjs(expenseData.createdAt).valueOf(),
        };

        const newExpenseId = push(child(ref(database), `users/${user.uid}/expenses`)).key;
        update(ref(database), { [`users/${user.uid}/expenses/${newExpenseId}`]: newExpense });

        dispatch({ type: 'ADD_EXPENSE', expense: { id: newExpenseId, ...newExpense } });
    };

    const removeExpense = (id) => {
        remove(ref(database, `users/${user.uid}/expenses/${user.id}`));

        dispatch({ type: 'REMOVE_EXPENSE', id });
    };

    const editExpense = (id, updates) => {
        const updatedExpense = {
            ...updates,
            createdAt: dayjs(updates.createdAt).valueOf(),
        };
        delete updatedExpense.id;

        update(ref(database), { [`users/${user.uid}/expenses/${id}`]: updatedExpense });

        dispatch({ type: 'EDIT_EXPENSE', id, updates });
    };

    return { addExpense, removeExpense, editExpense };
};
