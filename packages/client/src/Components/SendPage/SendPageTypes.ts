import { SendFormStatusResponseType } from '../../api/types/sendFormTypes';

export type SendPageStateType = {
    FormStatus: SendFormStatusResponseType['status'] | null;
    IsFormStatusPending: boolean;
    SendedGameStatus: number;
    IsSendGamePending: boolean;
};
