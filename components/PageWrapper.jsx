import { Button } from '@mantine/core';
import React, { useState } from 'react';
import { customButtonStyles } from 'utils/customButtonStyles';
import AddExpenseModal from './AddExpenseModal';

const PageWrapper = ({ title, children }) => {
    const [modalOpened, setModalOpened] = useState(false);
    return (
        <>
            <AddExpenseModal opened={modalOpened} setOpened={setModalOpened} />
            <div className="content-header">
                <h1>{title}</h1>
                <Button
                    radius="md"
                    styles={customButtonStyles}
                    onClick={() => setModalOpened(true)}>
                    Add New Expense
                </Button>
            </div>
            <div className="box-container">{children}</div>
        </>
    );
};
export default PageWrapper;
