import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getIsAuth } from '../Components/AdminLogin/AdminLoginReduxSelectors';

const withAuthRedirect = (Component: React.ComponentType): React.FunctionComponent => {
    return props => {
        const IsAuth = useSelector(getIsAuth);

        return IsAuth ? <Component {...props} /> : <Navigate to="/adminlogin" />;
    };
};

export default withAuthRedirect;
