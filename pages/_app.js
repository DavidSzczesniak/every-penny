import { MantineProvider } from '@mantine/core';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { AuthProvider } from 'context/auth';
import {
    ExpensesContext,
    expensesReducer,
    filtersReducer,
    initialExpensesState,
} from 'context/expensesContext';
import { useRouter } from 'next/router';
import React, { useReducer, useState } from 'react';
import 'styles/styles.scss';
import { reduceReducers } from 'utils/reduceReducers';
import { disableScrolling, enableScrolling } from 'utils/utils';

function MyApp({ Component, pageProps }) {
    const [sidebarOpen, setSidebar] = useState(false);
    const router = useRouter();
    const rootReducer = reduceReducers(expensesReducer, filtersReducer);
    const [state, dispatch] = useReducer(rootReducer, initialExpensesState);

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
                primaryColor: 'green',
            }}>
            <AuthProvider>
                <ExpensesContext.Provider value={{ ...state, dispatch }}>
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
            </AuthProvider>
        </MantineProvider>
    );
}

export default MyApp;
