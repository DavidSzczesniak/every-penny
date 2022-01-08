import ExpenseList from 'components/ExpenseList';
import ExpenseModal from 'components/ExpenseModal';
import PageWrapper from 'components/PageWrapper';
import { useAuth } from 'context/auth';
import { ExpensesContext } from 'context/expensesContext';
import { child, get } from 'firebase/database';
import databaseRef from 'lib/firebase';
import React, { useContext, useEffect, useState } from 'react';

const ExpensesListPage = () => {
    const { user } = useAuth();
    const { dispatch } = useContext(ExpensesContext);
    const [currentExpense, setCurrentExpense] = useState(undefined);

    useEffect(() => {
        if (user) {
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
                />
            )}
            <ExpenseList setCurrentExpense={setCurrentExpense} />
        </PageWrapper>
    );
};

export default ExpensesListPage;
