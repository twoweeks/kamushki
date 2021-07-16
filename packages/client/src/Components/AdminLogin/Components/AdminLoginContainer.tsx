import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReCaptchaProvider } from 'react-recaptcha-x';
import { Navigate } from 'react-router-dom';

import CONFIG from '../../../config';

import { ADMIN_PAGE_DEFAULT_ROUTE } from '../../App/routes';

import { loginThunk, checkAuthThunk } from '../AdminLoginReduxSlice';
import { resetLoginError } from '../AdminLoginReduxSlice';

import { getIsAuth, getIsLoginPending, getIsLogihError, getIsAuthCheckComplete } from '../AdminLoginReduxSelectors';

import AdminLogin from './AdminLogin';

const AdminLoginContainer: React.FC = () => {
    const IsAuth = useSelector(getIsAuth);
    const IsLoginPending = useSelector(getIsLoginPending);
    const IsLogihError = useSelector(getIsLogihError);
    const IsAuthCheckComplete = useSelector(getIsAuthCheckComplete);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthThunk());

        return () => {
            dispatch(resetLoginError());
        };
    }, []);

    const formDataHandler = useCallback((data: Parameters<typeof loginThunk>[0]) => {
        dispatch(loginThunk(data));
    }, []);

    if (!IsAuthCheckComplete) return null;

    if (IsAuth) return <Navigate to={ADMIN_PAGE_DEFAULT_ROUTE} />;

    return (
        <ReCaptchaProvider siteKeyV2={CONFIG.API_KEYS.recaptcha}>
            <AdminLogin {...{ IsLoginPending, IsLogihError }} {...{ formDataHandler }} />
        </ReCaptchaProvider>
    );
};

export default AdminLoginContainer;
