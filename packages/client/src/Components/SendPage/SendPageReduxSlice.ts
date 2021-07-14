import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SendPageStateType } from './SendPageTypes';

import SendFormAPI from '../../api/services/sensFormService';

const ReducerName = 'sendPage';

const { getStatus, sendGame } = SendFormAPI;

export const getStatusThunk = createAsyncThunk(`${ReducerName}/getStatus`, async () => {
    return await getStatus();
});

export const sendGameThunk = createAsyncThunk(`${ReducerName}/sendGame`, async (params: Parameters<typeof sendGame>[0]) => {
    return await sendGame(params);
});

const InitialState: SendPageStateType = {
    FormStatus: null,
    IsFormStatusPending: false,
    SendedGameStatus: 'not_sent',
    IsSendGamePending: false,
};

const SendPageSlice = createSlice({
    name: ReducerName,
    initialState: InitialState,
    reducers: {
        resetSendedGameStatus: (state, action: PayloadAction<void>) => {
            state.SendedGameStatus = InitialState.SendedGameStatus;
        },
    },
    extraReducers: builder => {
        builder.addCase(getStatusThunk.pending, (state, action) => {
            state.IsFormStatusPending = true;
        });
        builder.addCase(getStatusThunk.fulfilled, (state, action) => {
            state.FormStatus = action.payload.status;
            state.IsFormStatusPending = false;
        });
        builder.addCase(getStatusThunk.rejected, (state, action) => {
            console.warn(action.error);
            state.IsFormStatusPending = false;
        });

        builder.addCase(sendGameThunk.pending, (state, action) => {
            state.IsSendGamePending = true;
        });
        builder.addCase(sendGameThunk.fulfilled, (state, action) => {
            state.SendedGameStatus = action.payload.status;
            state.IsSendGamePending = false;
        });
        builder.addCase(sendGameThunk.rejected, (state, action) => {
            // TODO: обработка для wrong_data
            state.SendedGameStatus = 'unknown';
            state.IsSendGamePending = false;
            console.warn(action.error);
        });
    },
});

export const { resetSendedGameStatus } = SendPageSlice.actions;

export default SendPageSlice.reducer;
