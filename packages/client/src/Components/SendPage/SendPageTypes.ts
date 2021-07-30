import { SendFormStatusResponseType, SendEntryQueryResponseType } from '../../api/services/sensFormService/types';
import { SendEntryQueryParamsType } from '../../api/services/sensFormService/types';

export type SendedEntryStatusType = SendEntryQueryResponseType['status'] | 'not_sent' | 'wrong_data' | 'unknown';

export type SendPageStateType = {
    FormStatus: SendFormStatusResponseType['status'] | null;
    IsFormStatusPending: boolean;
    SendedEntryStatus: SendedEntryStatusType;
    IsSendEntryPending: boolean;
};

export type FormDataStorageItemType = Omit<SendEntryQueryParamsType, 'captcha'>;
