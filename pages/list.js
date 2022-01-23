import ExpenseList from 'components/ExpenseList';
import ExpenseModal from 'components/ExpenseModal';
import PageWrapper from 'components/PageWrapper';
import { useExpensesContext } from 'hooks/useExpensesContext';
import React, { useState } from 'react';

const ExpensesListPage = () => {
    const [currentExpense, setCurrentExpense] = useState(undefined);
    const { editExpense, removeExpense } = useExpensesContext();

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
            <ExpenseList setCurrentExpense={setCurrentExpense} />
        </PageWrapper>
    );
};

export default ExpensesListPage;
