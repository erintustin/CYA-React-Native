import { configureStore } from '@reduxjs/toolkit';
import { resourcesReducer } from '../features/resources/resourcesSlice';
import { notesReducer } from '../features/notes/notesSlice';
import { myToolkitReducer } from '../features/myToolkit/myToolkitSlice';
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
}

export const store = configureStore({
    reducer: persistCombineReducers(config, {
        resources: resourcesReducer,
        notes: notesReducer,
        myToolkitResources: myToolkitReducer
    }),
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ]
        }
    })
});

export const persistor = persistStore(store);