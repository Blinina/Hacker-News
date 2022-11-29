import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const url = "https://hacker-news.firebaseio.com/v0/";
export const getDataStory = createAsyncThunk('story/getDataStory', async (payload) => {
    const res = await axios.get(`${url}/item/${payload}.json?print=pretty`);
    return res.data
});


const storyAdapter = createEntityAdapter();

const initialState = {
    ...storyAdapter.getInitialState(),
};


const sliceStory = createSlice({
    name: "story",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getDataStory.fulfilled, (state, action) => {
                const { payload } = action;
                storyAdapter.setOne(state, payload);
                state.isLoading = false;
                state.loadingError = null;
            })
            .addCase(getDataStory.pending, (state) => {
                state.isLoading = true;
                state.loadingError = null;
            })
            .addCase(getDataStory.rejected, (state, action) => {
                console.log('rejected');
                state.isLoading = false;
                state.loadingError = action.error;
            });
    },
});

export const selectorsStory = storyAdapter.getSelectors((state) => state.story);
export const getStory = (state) => selectorsStory.selectAll(state);



export default sliceStory.reducer;