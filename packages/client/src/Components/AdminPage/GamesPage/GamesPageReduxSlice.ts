import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { AdminGamesPageStateType } from './GamesPageTypes';

export const ReducerName = 'adminGamesPage';

const InnitialState: AdminGamesPageStateType = {};

const AdminGamesPage = createSlice({
    name: ReducerName,
    initialState: InnitialState,
    reducers: {},
    extraReducers: builder => {
        //
    },
});

export default AdminGamesPage.reducer;
