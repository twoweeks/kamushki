import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import * as ROUTES from '../routes';

import App from './App';

const AppContainer: React.FC = () => {
    const { pathname: LocationPathname } = useLocation();

    if (!Object.values(ROUTES).includes(LocationPathname)) {
        return <Navigate to="/send" />;
    }

    return <App />;
};

export default AppContainer;
