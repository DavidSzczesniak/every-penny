import ExpenseList from 'components/ExpenseList';
import ExpenseModal from 'components/ExpenseModal';
import PageWrapper from 'components/PageWrapper';
import { database } from 'config/firebase';
import { useAuth } from 'context/auth';
import { ExpensesContext } from 'context/expensesContext';
import { child, get, ref } from 'firebase/database';
import { useExpensesContext } from 'hooks/useExpensesContext';
import React, { useContext, useEffect, useState } from 'react';

const ExpensesListPage = () => {
    const { user } = useAuth();
    const { dispatch } = useContext(ExpensesContext);
    const [currentExpense, setCurrentExpense] = useState(undefined);
    const [isLoading, setLoading] = useState(true);
    const { editExpense, removeExpense } = useExpensesContext();

    useEffect(() => {
        if (user) {
            const databaseRef = ref(database);
            get(child(databaseRef, `users/${user.uid}/expenses`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const dbData = snapshot.val();
                    const expenses = [];
                    for (const [key, value] of Object.entries(dbData)) {
                        expenses.push({
                            id: key,
                            ...value,
                        });
                    }
                    dispatch({ type: 'SET_EXPENSES', expenses });
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            });
        }
    }, [user, dispatch]);

    return (
        <PageWrapper title="Expenses List">
            {!!currentExpense && (
                <ExpenseModal
                    opened={!!currentExpense}
                    setOpened={setCurrentExpense}
                    expenseData={currentExpense}
                    onSubmit={(values) => editExpense(currentExpense.id, values)}
                    onRemove={() => removeExpense(currentExpense.id)}
                />
            )}
            <ExpenseList setCurrentExpense={setCurrentExpense} isLoading={isLoading} />
        </PageWrapper>
    );
};

export default ExpensesListPage;
