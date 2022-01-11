import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import NavUserInfo from 'components/NavUserInfo';

const mockUser = {
    name: 'David Szczesniak',
    photoUrl: '/public/placeholder-avatar.png',
};
const mockFirstName = mockUser.name.split(' ')[0];
const signout = jest.fn();

it('should render with basic props', () => {
    render(<NavUserInfo user={mockUser} signout={signout} />);

    expect(screen.getByRole('img', { name: /placeholder avatar/i })).toBeInTheDocument();
    expect(screen.getByText(mockFirstName)).toBeInTheDocument();
});

it('should open popover', async () => {
    render(<NavUserInfo user={mockUser} signout={signout} />);

    userEvent.click(screen.getByRole('button', { name: `placeholder avatar ${mockFirstName}` }));
    // wait for popover
    await screen.findByRole('dialog');
    expect(screen.getByRole('button', { name: /Sign Out/ })).toBeInTheDocument();
    expect(screen.getByText(`Welcome, ${mockFirstName}!`)).toBeInTheDocument();
});

it('should call signout', async () => {
    render(<NavUserInfo user={mockUser} signout={signout} />);

    userEvent.click(screen.getByRole('button', { name: `placeholder avatar ${mockFirstName}` }));
    // wait for popover
    const signOutButton = await screen.findByRole('button', { name: /sign out/i });
    userEvent.click(signOutButton);

    expect(signout).toHaveBeenCalled();
});
