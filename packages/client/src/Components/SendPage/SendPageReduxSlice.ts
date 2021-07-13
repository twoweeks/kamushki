import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { SendPageStateType } from './SendPageTypes';

import SendFormAPI from '../../api/services/sensFormService';

const ReducerName = 'sendPage';

const { getStatus, sendGame } = SendFormAPI;

export const getStatusThunk = createAsyncThunk(`${ReducerName}/getStatus`, async () => {
    return await getStatus();
});

export const sendGameThunk = createAsyncThunk(`${ReducerName}/sendGame`, async (params: Parameters<typeof sendGame>[0]) => {
    const response = await sendGame(params);
    return response.status;
});

const InitialState: SendPageStateType = {
    FormStatus: null,
    IsFormStatusPending: false,
    SendedGameStatus: -1,
    IsSendGamePending: false,
};

const SendPageSlice = createSlice({
    name: ReducerName,
    initialState: InitialState,
    reducers: {},
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
            state.SendedGameStatus = action.payload;
            state.IsSendGamePending = false;
        });
        builder.addCase(sendGameThunk.rejected, (state, action) => {
            console.warn(action.error);
            state.IsSendGamePending = false;
        });
    },
});

export default SendPageSlice.reducer;
