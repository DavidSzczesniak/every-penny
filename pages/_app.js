import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import 'styles/styles.scss';
import { disableScrolling, enableScrolling } from 'utils/utils';

function MyApp({ Component, pageProps }) {
    const [sidebarOpen, setSidebar] = useState(false);
    const router = useRouter();

    router.events &&
        router.events.on('routeChangeComplete', (url) => {
            setSidebar(false);
            enableScrolling();
        });

    const toggleSidebar = () => {
        if (sidebarOpen) {
            enableScrolling();
        } else {
            disableScrolling();
        }
        setSidebar(!sidebarOpen);
    };

    return (
        <div>
            {sidebarOpen ? (
                <Sidebar toggleSidebar={toggleSidebar} />
            ) : (
                <Navbar toggleSidebar={toggleSidebar} />
            )}
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
