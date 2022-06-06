import { Button } from '@mantine/core';
import { database } from 'config/firebase';
import { useAuth } from 'context/auth';
import { ExpensesContext } from 'context/expensesContext';
import { child, get, ref } from 'firebase/database';
import { useExpensesContext } from 'hooks/useExpensesContext';
import React, { useContext, useEffect, useState } from 'react';
import { primaryButtonStyles } from 'utils/customButtonStyles';
import ExpenseModal from './ExpenseModal';
import LoadingScreen from './LoadingScreen';

const PageWrapper = ({ title, children }) => {
    const [modalOpened, setModalOpened] = useState(false);
    const { user } = useAuth();
    const { dispatch } = useContext(ExpensesContext);
    const { addExpense } = useExpensesContext();
    const [isLoading, setLoading] = useState(true);

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
        <>
            {modalOpened && (
                <ExpenseModal
                    opened={modalOpened}
                    setOpened={setModalOpened}
                    onSubmit={(values) => addExpense(values)}
                />
            )}
            <div className="content-header">
                <h1>{title}</h1>
                {title === 'Expenses List' && (
                    <Button styles={primaryButtonStyles} onClick={() => setModalOpened(true)}>
                        Add New Expense
                    </Button>
                )}
            </div>
            <div className="box-container">{isLoading ? <LoadingScreen /> : children}</div>
        </>
    );
};
export default PageWrapper;
