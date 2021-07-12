import { createSlice } from '@reduxjs/toolkit';

export const ReducerName = 'sendPage';

const InnitialState = {};

const SendPageSlice = createSlice({
    name: ReducerName,
    initialState: InnitialState,
    reducers: {},
    extraReducers: builder => {
        //
    },
});

export default SendPageSlice.reducer;
