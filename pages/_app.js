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
            <div className="page-divider"></div>
        </div>
    );
}

export default MyApp;
