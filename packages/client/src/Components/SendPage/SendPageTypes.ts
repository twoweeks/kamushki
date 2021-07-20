import { SendFormStatusResponseType, SendFormResponseType } from '../../api/types/sendFormTypes';
import { SendFormQueryParamsType } from '../../api/types/sendFormTypes';

export type SendedGameStatusType = SendFormResponseType['status'] | 'not_sent' | 'wrong_data' | 'unknown';

export type SendPageStateType = {
    FormStatus: SendFormStatusResponseType['status'] | null;
    IsFormStatusPending: boolean;
    SendedGameStatus: SendedGameStatusType;
    IsSendGamePending: boolean;
};

export type FormDataStorageItemType = Omit<SendFormQueryParamsType['gameInfo'], 'archive' | 'screenshot'>;
