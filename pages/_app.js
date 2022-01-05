import { MantineProvider } from '@mantine/core';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { ExpensesContext, expensesReducer, initialExpensesState } from 'context/expensesContext';
import { useRouter } from 'next/router';
import React, { useReducer, useState } from 'react';
import 'styles/styles.scss';
import { disableScrolling, enableScrolling } from 'utils/utils';

function MyApp({ Component, pageProps }) {
    const [sidebarOpen, setSidebar] = useState(false);
    const router = useRouter();
    const [state, dispatch] = useReducer(expensesReducer, initialExpensesState);

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
        <MantineProvider
            theme={{
                fontFamily: 'Poppins, sans-serif',
            }}>
            <ExpensesContext.Provider value={{ state, dispatch }}>
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
            </ExpensesContext.Provider>
        </MantineProvider>
    );
}

export default MyApp;
