import { configureStore } from '@reduxjs/toolkit';
import { resourcesReducer } from '../features/resources/resourcesSlice';
import { notesReducer } from '../features/notes/notesSlice';
import { myToolkitReducer } from '../features/myToolkit/myToolkitSlice';


export const store = configureStore({
    reducer: {
        resources: resourcesReducer,
        notes: notesReducer,
        myToolkitResources: myToolkitReducer
    }
});