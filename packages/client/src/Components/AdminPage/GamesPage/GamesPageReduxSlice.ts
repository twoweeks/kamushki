import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import GamesAPI from '../../../api/services/gamesService';

import type { AdminGamesPageStateType } from './GamesPageTypes';

export const ReducerName = 'adminGamesPage';

const { getContests, getGames, deleteGames } = GamesAPI;

export const getContestsThunk = createAsyncThunk(`${ReducerName}/getContests`, async () => {
    return await getContests();
});

export const getGamesThunk = createAsyncThunk(`${ReducerName}/getGames`, async (params: Parameters<typeof getGames>[0]) => {
    return await getGames(params);
});

export const deleteGamesThunk = createAsyncThunk(`${ReducerName}/deleteGames`, async (params: Parameters<typeof deleteGames>[0]) => {
    const response = await deleteGames(params);
    return response.status;
});

const InnitialState: AdminGamesPageStateType = {
    Data: {
        ContestsData: [],
        IsContestsDataPending: false,
        GamesData: [],
        IsGamesDataPending: false,
    },
    Filters: {
        Stage: 'all',
    },
};

const AdminGamesPage = createSlice({
    name: ReducerName,
    initialState: InnitialState,
    reducers: {
        setStageFIlter: (state, action: PayloadAction<AdminGamesPageStateType['Filters']['Stage']>) => {
            state.Filters.Stage = action.payload;
        },

        deleteGamesFromData: (state, action: PayloadAction<string[]>) => {
            state.Data.GamesData = state.Data.GamesData.filter(GameInfo => !action.payload.includes(GameInfo._id));
        },

        resetData: (state, action: PayloadAction<void>) => {
            state.Data = { ...InnitialState.Data };
            state.Filters = { ...InnitialState.Filters };
        },
    },
    extraReducers: builder => {
        builder.addCase(getContestsThunk.pending, (state, action) => {
            state.Data.IsContestsDataPending = true;
        });
        builder.addCase(getContestsThunk.fulfilled, (state, action) => {
            state.Data.ContestsData = action.payload;
            state.Data.IsContestsDataPending = false;
        });
        builder.addCase(getContestsThunk.rejected, (state, action) => {
            console.warn(action.error);
            state.Data.IsContestsDataPending = false;
        });

        builder.addCase(getGamesThunk.pending, (state, action) => {
            state.Data.IsGamesDataPending = true;
        });
        builder.addCase(getGamesThunk.fulfilled, (state, action) => {
            state.Data.GamesData = action.payload;
            state.Data.IsGamesDataPending = false;
        });
        builder.addCase(getGamesThunk.rejected, (state, action) => {
            console.warn(action.error);
            state.Data.IsGamesDataPending = false;
        });

        builder.addCase(deleteGamesThunk.pending, (state, action) => {
            //
        });
        builder.addCase(deleteGamesThunk.fulfilled, (state, action) => {
            //
        });
        builder.addCase(deleteGamesThunk.rejected, (state, action) => {
            console.warn(action.error);
        });
    },
});

export const { setStageFIlter, deleteGamesFromData, resetData } = AdminGamesPage.actions;

export default AdminGamesPage.reducer;
