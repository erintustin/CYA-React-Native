import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async () => {
        const response = await fetch(baseUrl + 'notes');
        return response.json();
    }
);

const notesSlice = createSlice({
    name: 'notes',
    initialState: { isLoading: true, errMess: null, notesArray: [] },
    reducers: {},
    extraReducers: {
        [fetchNotes.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchNotes.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.notesArray = action.payload;
        },
        [fetchNotes.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const notesReducer = notesSlice.reducer;