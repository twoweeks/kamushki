import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReCaptchaProvider } from 'react-recaptcha-x';

import CONFIG from '../../../config';

import { getStatusThunk, sendGameThunk } from '../SendPageReduxSlice';

import { getFormStatus, getIsFormStatusPending } from '../SendPageReduxSelectors';

import SendPage from './SendPage';

const SendPageContainer: React.FC = () => {
    const FormStatus = useSelector(getFormStatus);
    const IsFormStatusPending = useSelector(getIsFormStatusPending);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStatusThunk());
    }, []);

    const formDataHandler = useCallback((data: Parameters<typeof sendGameThunk>[0]) => {
        dispatch(sendGameThunk(data));
    }, []);

    return (
        <ReCaptchaProvider siteKeyV2={CONFIG.API_KEYS.recaptcha}>
            <SendPage {...{ FormStatus, IsFormStatusPending }} {...{ formDataHandler }} />
        </ReCaptchaProvider>
    );
};

export default SendPageContainer;
