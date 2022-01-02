import Navbar from 'components/Navbar';
import React from 'react';
import 'styles/styles.scss';

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Navbar />
            <div className="layout-wrapper">
                <div className="content-container">
                    <Component {...pageProps} />
                </div>
            </div>
            <svg className="blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="#A3EBB1"
                    d="M40.5,-70.8C53.3,-62.7,65.1,-53.5,73.3,-41.6C81.6,-29.6,86.3,-14.8,85.2,-0.6C84.1,13.5,77.2,27.1,70.3,41.3C63.3,55.6,56.3,70.5,44.6,79.6C32.9,88.8,16.4,92.1,1,90.4C-14.5,88.7,-29,82,-40.2,72.6C-51.4,63.1,-59.4,51,-68.7,38.5C-78,25.9,-88.6,13,-91.2,-1.5C-93.9,-16,-88.5,-32,-79.4,-44.9C-70.4,-57.9,-57.6,-67.8,-43.7,-75.2C-29.9,-82.6,-14.9,-87.6,-0.6,-86.6C13.8,-85.7,27.7,-78.8,40.5,-70.8Z"
                    transform="translate(100 100)"
                />
            </svg>
        </div>
    );
}

export default MyApp;
