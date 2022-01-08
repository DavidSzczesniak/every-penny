import Image from 'next/image';
import React from 'react';

const LoadingScreen = () => (
    <div className="loader">
        <Image
            className="loader__img"
            src="/loading-green.gif"
            alt="loading spinner"
            width={100}
            height={100}
        />
    </div>
);

export default LoadingScreen;
