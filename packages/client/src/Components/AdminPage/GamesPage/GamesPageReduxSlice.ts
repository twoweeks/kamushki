import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import GamesAPI from '../../../api/services/gamesService';

import type { AdminGamesPageStateType } from './GamesPageTypes';

export const ReducerName = 'adminGamesPage';

const { getContests, getEntries, editEntryInfo, deleteEntries } = GamesAPI;

export const getContestsThunk = createAsyncThunk(`${ReducerName}/getContests`, async () => {
    return await getContests();
});

export const getEntriesThunk = createAsyncThunk(`${ReducerName}/getEntries`, async (params: Parameters<typeof getEntries>[0]) => {
    return await getEntries(params);
});

export const editEntryInfoThunk = createAsyncThunk(`${ReducerName}/editEntryInfo`, async (params: Parameters<typeof editEntryInfo>[0]) => {
    return await editEntryInfo(params);
});

export const deleteEntriesThunk = createAsyncThunk(`${ReducerName}/deleteEntries`, async (params: Parameters<typeof deleteEntries>[0]) => {
    return await deleteEntries(params);
});

const InnitialState: AdminGamesPageStateType = {
    Data: {
        ContestsData: [],
        IsContestsDataPending: false,
        EntriesData: [],
        IsEntriesDataPending: false,
    },
    Filters: {
        Stage: 'all',
    },
    EditableEntryID: '',
};

const AdminGamesPage = createSlice({
    name: ReducerName,
    initialState: InnitialState,
    reducers: {
        setStageFIlter: (state, action: PayloadAction<AdminGamesPageStateType['Filters']['Stage']>) => {
            state.Filters.Stage = action.payload;
        },

        setEditableEntryID: (state, action: PayloadAction<AdminGamesPageStateType['EditableEntryID']>) => {
            state.EditableEntryID = action.payload;
        },
        resetEditableEntryID: (state, action: PayloadAction<void>) => {
            state.EditableEntryID = InnitialState.EditableEntryID;
        },

        resetState: (state, action: PayloadAction<void>) => {
            state.Data = { ...InnitialState.Data };
            state.Filters = { ...InnitialState.Filters };
            state.EditableEntryID = InnitialState.EditableEntryID;
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

        builder.addCase(getEntriesThunk.pending, (state, action) => {
            state.Data.IsEntriesDataPending = true;
        });
        builder.addCase(getEntriesThunk.fulfilled, (state, action) => {
            state.Data.EntriesData = action.payload;
            state.Data.IsEntriesDataPending = false;
        });
        builder.addCase(getEntriesThunk.rejected, (state, action) => {
            console.warn(action.error);
            state.Data.IsEntriesDataPending = false;
        });

        builder.addCase(editEntryInfoThunk.pending, (state, action) => {
            //
        });
        builder.addCase(editEntryInfoThunk.fulfilled, (state, action) => {
            state.Data.EntriesData = state.Data.EntriesData.map(EntryData => {
                if (EntryData._id === action.payload._id) {
                    return { ...EntryData, ...action.payload };
                } else {
                    return EntryData;
                }
            });
        });
        builder.addCase(editEntryInfoThunk.rejected, (state, action) => {
            console.warn(action.error);
        });

        builder.addCase(deleteEntriesThunk.pending, (state, action) => {
            //
        });
        builder.addCase(deleteEntriesThunk.fulfilled, (state, action) => {
            state.Data.EntriesData = state.Data.EntriesData.filter(EntryData => !action.payload.includes(EntryData._id));
        });
        builder.addCase(deleteEntriesThunk.rejected, (state, action) => {
            console.warn(action.error);
        });
    },
});

export const { setStageFIlter, setEditableEntryID } = AdminGamesPage.actions;
export const { resetState, resetEditableEntryID } = AdminGamesPage.actions;

export default AdminGamesPage.reducer;
