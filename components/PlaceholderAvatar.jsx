import Image from 'next/image';
import React from 'react';

const PlaceholderAvatar = () => (
    <Image
        className="user-info__avatar"
        src="/placeholder-avatar.png"
        alt="placeholder avatar"
        width={40}
        height={40}
    />
);

export default PlaceholderAvatar;
