import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';
import { mapImageURL } from '../../utils/mapImageURL';

export const fetchResources = createAsyncThunk(
    'resources/fetchResources',
    async () => {
        const response = await fetch(baseUrl + 'resources');
        return response.json();
    }
);

export const postResource = createAsyncThunk(
    'resources/postResource',
    async (payload, 
          {dispatch, getState}
          ) => {
            setTimeout(() => {
                const { resources } = getState();
                payload.id = resources.resourcesArray.length;
                dispatch(addResource(payload));
            }, 2000);
    }
);

const resourcesSlice = createSlice({
    name: 'resources',
    initialState: { isLoading: true, errMess: null, resourcesArray: [] },
    reducers: {
        addResource: (state, action) => {
            state.resourcesArray.push(action.payload);
        },
    },
    extraReducers: {
        [fetchResources.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchResources.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.resourcesArray = mapImageURL(action.payload);
        },
        [fetchResources.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const resourcesReducer = resourcesSlice.reducer;
export const { addResource } = resourcesSlice.actions;