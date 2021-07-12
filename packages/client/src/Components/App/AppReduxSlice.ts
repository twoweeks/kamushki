import { createSlice } from '@reduxjs/toolkit';

export const ReducerName = 'app';

const InnitialState = {};

const AppSlice = createSlice({
    name: ReducerName,
    initialState: InnitialState,
    reducers: {},
    extraReducers: builder => {
        //
    },
});

export default AppSlice.reducer;
