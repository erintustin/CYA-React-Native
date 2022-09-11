import { createSlice } from "@reduxjs/toolkit";

const myToolkitSlice = createSlice({
    name: 'myToolkitResources',
    initialState: [],
    reducers: {
        toggleAddToToolkit: (myToolkitResources, action) => {
            if (myToolkitResources.includes(action.payload)) {
                return myToolkitResources.filter(
                    (myToolkitResource) => myToolkitResource !== action.payload
                );
            } else {
                myToolkitResources.push(action.payload);
            }
        }
    }

});

export const { toggleAddToToolkit } = myToolkitSlice.actions;
export const myToolkitReducer = myToolkitSlice.reducer;