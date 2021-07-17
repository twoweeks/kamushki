import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import GamesAPI from '../../../api/services/gamesService';

import type { AdminGamesPageStateType } from './GamesPageTypes';

export const ReducerName = 'adminGamesPage';

const { getContests, getGames, editGameInfo, deleteGames } = GamesAPI;

export const getContestsThunk = createAsyncThunk(`${ReducerName}/getContests`, async () => {
    return await getContests();
});

export const getGamesThunk = createAsyncThunk(`${ReducerName}/getGames`, async (params: Parameters<typeof getGames>[0]) => {
    return await getGames(params);
});

export const editGameInfoThunk = createAsyncThunk(`${ReducerName}/editGameInfo`, async (params: Parameters<typeof editGameInfo>[0]) => {
    return await editGameInfo(params);
});

export const deleteGamesThunk = createAsyncThunk(`${ReducerName}/deleteGames`, async (params: Parameters<typeof deleteGames>[0]) => {
    return await deleteGames(params);
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
    EditableGameID: '',
};

const AdminGamesPage = createSlice({
    name: ReducerName,
    initialState: InnitialState,
    reducers: {
        setStageFIlter: (state, action: PayloadAction<AdminGamesPageStateType['Filters']['Stage']>) => {
            state.Filters.Stage = action.payload;
        },

        setEditableGameID: (state, action: PayloadAction<AdminGamesPageStateType['EditableGameID']>) => {
            state.EditableGameID = action.payload;
        },
        resetEditableGameID: (state, action: PayloadAction<void>) => {
            state.EditableGameID = InnitialState.EditableGameID;
        },

        resetState: (state, action: PayloadAction<void>) => {
            state.Data = { ...InnitialState.Data };
            state.Filters = { ...InnitialState.Filters };
            state.EditableGameID = InnitialState.EditableGameID;
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

        builder.addCase(editGameInfoThunk.pending, (state, action) => {
            //
        });
        builder.addCase(editGameInfoThunk.fulfilled, (state, action) => {
            state.Data.GamesData = state.Data.GamesData.map(GameInfo => {
                if (GameInfo._id === action.payload._id) {
                    return { ...GameInfo, ...action.payload };
                } else {
                    return GameInfo;
                }
            });
        });
        builder.addCase(editGameInfoThunk.rejected, (state, action) => {
            console.warn(action.error);
        });

        builder.addCase(deleteGamesThunk.pending, (state, action) => {
            //
        });
        builder.addCase(deleteGamesThunk.fulfilled, (state, action) => {
            state.Data.GamesData = state.Data.GamesData.filter(GameInfo => !action.payload.includes(GameInfo._id));
        });
        builder.addCase(deleteGamesThunk.rejected, (state, action) => {
            console.warn(action.error);
        });
    },
});

export const { setStageFIlter, setEditableGameID } = AdminGamesPage.actions;
export const { resetState, resetEditableGameID } = AdminGamesPage.actions;

export default AdminGamesPage.reducer;
