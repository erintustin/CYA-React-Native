import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const postFeedback = createAsyncThunk(
    'feedback/postFeedback',
    async (payload, 
          {dispatch, getState}
          ) => {
            setTimeout(() => {
                const { feedback } = getState();
                payload.id = feedback.feedbackArray.length;
                dispatch(addFeedback(payload));
            }, 2000);
    }
);

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: { isLoading: true, errMess: null, feedbackArray: [] },
    reducers: {
        addFeedback: (state, action) => {
            state.feedbackArray.push(action.payload);
        }
    }
    
});

export const feedbackReducer = feedbackSlice.reducer;
export const { addFeedback } = feedbackSlice.actions;