import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReCaptchaProvider } from 'react-recaptcha-x';

import CONFIG from '../../../config';

import type { FormDataStorageItemType } from '../SendPageTypes';

import { getStatusThunk, sendEntryThunk } from '../SendPageReduxSlice';

import { getFormStatus, getIsFormStatusPending, getSendedEntryStatus } from '../SendPageReduxSelectors';

import SendPage from './SendPage';
import StatusModal from './StatusModal/StatusModalContainer';

const SendPageContainer: React.FC = () => {
    const FormStatus = useSelector(getFormStatus);
    const IsFormStatusPending = useSelector(getIsFormStatusPending);
    const SendedEntryStatus = useSelector(getSendedEntryStatus);

    const FormDataStorageItemName = useRef('send_form_data');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStatusThunk());
    }, []);

    const formDataHandler = useCallback((data: Parameters<typeof sendEntryThunk>[0]) => {
        dispatch(sendEntryThunk(data));

        // const StorageData: FormDataStorageItemType = {
        //     email: data.email,
        //     title: data.gameInfo.title,
        //     description: data.gameInfo.description,
        //     genre: data.gameInfo.genre,
        //     tools: data.gameInfo.tools,
        // };

        // localStorage.setItem(FormDataStorageItemName.current, JSON.stringify(StorageData));
    }, []);

    const getFormDataStorageItemValue = useCallback((field: keyof FormDataStorageItemType['gameInfo']) => {
        // const StorageData: FormDataStorageItemType | null = JSON.parse(localStorage.getItem(FormDataStorageItemName.current) ?? 'null');

        // return StorageData ? StorageData[field] : void 0;

        return void 0;
    }, []);

    return (
        <ReCaptchaProvider siteKeyV2={CONFIG.API_KEYS.recaptcha}>
            <SendPage {...{ FormStatus, IsFormStatusPending }} {...{ formDataHandler }} {...{ getFormDataStorageItemValue }} />
            {SendedEntryStatus !== 'not_sent' ? <StatusModal /> : null}
        </ReCaptchaProvider>
    );
};

export default SendPageContainer;
