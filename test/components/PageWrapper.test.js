import { render, screen } from '@testing-library/react';
import PageWrapper from 'components/PageWrapper';
import React from 'react';
import userEvent from '@testing-library/user-event';

const mockChildren = <div>my homepage</div>;

it('should render with basic props', () => {
    render(<PageWrapper title="Home">{mockChildren}</PageWrapper>);

    expect(screen.getByRole('heading', { name: /Home/ })).toBeInTheDocument();
    // todo: re-write and mock the auth context to pass this
    // expect(screen.getByText('my homepage')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add New Expense/ })).toBeInTheDocument();
});

it('should open modal', () => {
    render(<PageWrapper title="Home">{mockChildren}</PageWrapper>);

    userEvent.click(screen.getByRole('button', { name: /Add New Expense/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Add New Expense/ })).toBeInTheDocument();
});
