import React from 'react';

const PageWrapper = ({ title, children }) => (
    <>
        <div className="content-header">
            <h1>{title}</h1>
            <button className="button">Add New Expense</button>
        </div>
        <div className="box-container">{children}</div>
    </>
);
export default PageWrapper;
