import { Button } from '@mantine/core';
import React from 'react';
import { customButtonStyles } from 'utils/customButtonStyles';

const PageWrapper = ({ title, children }) => {
    return (
        <>
            <div className="content-header">
                <h1>{title}</h1>
                <Button radius="md" styles={customButtonStyles}>
                    Add New Expense
                </Button>
            </div>
            <div className="box-container">{children}</div>
        </>
    );
};
export default PageWrapper;
