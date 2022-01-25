import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageWrapper from 'components/PageWrapper';
import React from 'react';

const mockChildren = <div>my homepage</div>;

it('should render with basic props', () => {
    render(<PageWrapper title="Home">{mockChildren}</PageWrapper>);

    expect(screen.getByRole('heading', { name: /Home/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add New Expense/ })).toBeInTheDocument();
    // loading screen
    expect(screen.getByRole('presentation')).toBeInTheDocument();
});

// todo: re-write and mock the auth context
// it('should retrieve expenses from firebase', () => {
//     render(<PageWrapper title="Home">{mockChildren}</PageWrapper>);

//     // expect(screen.getByText('my homepage')).toBeInTheDocument();
// });

it('should open modal', () => {
    render(<PageWrapper title="Home">{mockChildren}</PageWrapper>);

    userEvent.click(screen.getByRole('button', { name: /Add New Expense/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: /Add New Expense/ })).toBeInTheDocument();
});
