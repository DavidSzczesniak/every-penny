import { Button } from '@mantine/core';
import React, { useState } from 'react';
import { primaryButtonStyles } from 'utils/customButtonStyles';
import ExpenseModal from './ExpenseModal';

const PageWrapper = ({ title, children }) => {
    const [modalOpened, setModalOpened] = useState(false);
    return (
        <>
            {modalOpened && <ExpenseModal opened={modalOpened} setOpened={setModalOpened} />}
            <div className="content-header">
                <h1>{title}</h1>
                <Button styles={primaryButtonStyles} onClick={() => setModalOpened(true)}>
                    Add New Expense
                </Button>
            </div>
            <div className="box-container">{children}</div>
        </>
    );
};
export default PageWrapper;
