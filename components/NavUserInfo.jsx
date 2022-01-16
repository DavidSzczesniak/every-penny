import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { Button, Popover, UnstyledButton } from '@mantine/core';
import React, { Suspense, useState } from 'react';
import { primaryButtonStyles } from 'utils/customButtonStyles';
import PlaceholderAvatar from './PlaceholderAvatar';
import { SuspenseImage } from './SuspenseImage';

const NavUserInfo = ({ user, signout }) => {
    const [opened, setOpened] = useState(false);
    const firstName = user.name.split(' ')[0];
    return (
        <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom"
            transition="scale"
            target={
                <UnstyledButton className="user-info" onClick={() => setOpened(!opened)}>
                    <Suspense fallback={<PlaceholderAvatar />}>
                        <SuspenseImage
                            className="user-info__avatar"
                            src={user.photoUrl}
                            alt="user avatar"
                            referrerPolicy="no-referrer"
                        />
                    </Suspense>
                    <p className="user-info__username">{firstName}</p>
                    {opened ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </UnstyledButton>
            }
            withArrow>
            <div className="user-info-popover">
                <p>Welcome, {firstName}!</p>
                <Button styles={primaryButtonStyles} onClick={signout}>
                    Sign Out
                </Button>
            </div>
        </Popover>
    );
};

export default NavUserInfo;
