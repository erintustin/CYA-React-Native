import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async () => {
        const response = await fetch(baseUrl + 'notes');
        return response.json();
    }
);

export const postNote = createAsyncThunk(
    'notes/postNote',
    async (payload, 
          {dispatch, getState}
          ) => {
            setTimeout(() => {
                const { notes } = getState();
                payload.id = notes.notesArray.length;
                dispatch(addNote(payload));
            }, 2000);
    }
);

const notesSlice = createSlice({
    name: 'notes',
    initialState: { isLoading: true, errMess: null, notesArray: [] },
    reducers: {
        addNote: (state, action) => {
            state.notesArray.push(action.payload);
        },
        deleteNote: (state, payload) => {
            const noteId = payload.id;
            state.notesArray.splice(noteId, 1);
        },
        editNote: (state, action) => {
            const oldNoteId = state.id;
            const newNote = action.payload;
            state.notesArray.splice(oldNoteId, 1, newNote);
                
    }
    },
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
export const { addNote, deleteNote, editNote } = notesSlice.actions;