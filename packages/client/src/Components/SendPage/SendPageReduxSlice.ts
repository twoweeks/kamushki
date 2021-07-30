import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SendPageStateType } from './SendPageTypes';

import SendFormAPI from '../../api/services/sensFormService';

const ReducerName = 'sendPage';

const { getStatus, sendEntry } = SendFormAPI;

export const getStatusThunk = createAsyncThunk(`${ReducerName}/getStatus`, async () => {
    return await getStatus();
});

export const sendEntryThunk = createAsyncThunk(`${ReducerName}/sendEntry`, async (params: Parameters<typeof sendEntry>[0]) => {
    return await sendEntry(params);
});

const InitialState: SendPageStateType = {
    FormStatus: null,
    IsFormStatusPending: false,
    SendedEntryStatus: 'not_sent',
    IsSendEntryPending: false,
};

const SendPageSlice = createSlice({
    name: ReducerName,
    initialState: InitialState,
    reducers: {
        resetSendedGameStatus: (state, action: PayloadAction<void>) => {
            state.SendedEntryStatus = InitialState.SendedEntryStatus;
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

        builder.addCase(sendEntryThunk.pending, (state, action) => {
            state.IsSendEntryPending = true;
        });
        builder.addCase(sendEntryThunk.fulfilled, (state, action) => {
            state.SendedEntryStatus = action.payload.status;
            state.IsSendEntryPending = false;
        });
        builder.addCase(sendEntryThunk.rejected, (state, action) => {
            // TODO: обработка для wrong_data
            state.SendedEntryStatus = 'unknown';
            state.IsSendEntryPending = false;
            console.warn(action.error);
        });
    },
});

export const { resetSendedGameStatus } = SendPageSlice.actions;

export default SendPageSlice.reducer;
