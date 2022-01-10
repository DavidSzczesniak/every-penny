import { render, screen } from '@testing-library/react';
import PageWrapper from 'components/PageWrapper';
import React from 'react';
import userEvent from '@testing-library/user-event';

it('should render with basic props', () => {
    const mockChildren = <div>my homepage</div>;
    render(<PageWrapper title="Home">{mockChildren}</PageWrapper>);

    expect(screen.getByRole('heading', { name: /Home/ })).toBeInTheDocument();
    expect(screen.getByText('my homepage')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add New Expense/ })).toBeInTheDocument();
});

it('should open modal', () => {
    const mockChildren = <div>my homepage</div>;
    render(<PageWrapper title="Home">{mockChildren}</PageWrapper>);

    userEvent.click(screen.getByRole('button', { name: /Add New Expense/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Add New Expense/ })).toBeInTheDocument();
});
