import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchResources = createAsyncThunk(
    'resources/fetchResources',
    async () => {
        const response = await fetch(baseUrl + 'resources');
        return response.json();
    }
);

const resourcesSlice = createSlice({
    name: 'resources',
    initialState: { isLoading: true, errMess: null, resourcesArray: [] },
    reducers: {},
    extraReducers: {
        [fetchResources.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchResources.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.resourcesArray = action.payload;
        },
        [fetchResources.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const resourcesReducer = resourcesSlice.reducer;