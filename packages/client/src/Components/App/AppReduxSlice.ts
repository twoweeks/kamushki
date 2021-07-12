import { createSlice } from '@reduxjs/toolkit';

export const ReducerName = 'app';

const InnitialState = {};

const App = createSlice({
    name: ReducerName,
    initialState: InnitialState,
    reducers: {},
    extraReducers: builder => {
        //
    },
});

export default App.reducer;
