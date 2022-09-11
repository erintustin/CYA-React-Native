import { configureStore } from '@reduxjs/toolkit';
import { resourcesReducer } from '../features/resources/resourcesSlice';
import { notesReducer } from '../features/notes/noteSlice';


export const store = configureStore({
    reducer: {
        resources: resourcesReducer,
        notes: notesReducer
    }
});