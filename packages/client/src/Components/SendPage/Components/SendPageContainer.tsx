import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReCaptchaProvider } from 'react-recaptcha-x';

import CONFIG from '../../../config';

import { getStatusThunk, sendGameThunk } from '../SendPageReduxSlice';

import { getFormStatus, getIsFormStatusPending, getSendedGameStatus } from '../SendPageReduxSelectors';

import SendPage from './SendPage';
import StatusModal from './StatusModal/StatusModalContainer';

const SendPageContainer: React.FC = () => {
    const FormStatus = useSelector(getFormStatus);
    const IsFormStatusPending = useSelector(getIsFormStatusPending);
    const SendedGameStatus = useSelector(getSendedGameStatus);

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
            {SendedGameStatus !== 'not_sent' ? <StatusModal /> : null}
        </ReCaptchaProvider>
    );
};

export default SendPageContainer;
