import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const url = "https://hacker-news.firebaseio.com/v0/";
export const getDataStory = createAsyncThunk('stories/getDataStory', async (payload, { dispatch})=> {
    const res = await axios.get(`${url}/item/${payload}.json?print=pretty`);
    dispatch(setCurrentNews(res.data))

});


const initialState = {
    story: [],
};


const sliceStory = createSlice({
    name: "story",
    initialState,
    reducers: {
        setCurrentNews:(state, action)=>{
          state.story=action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getDataStory.fulfilled, (state) => {
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
    }
    
});


export const {setCurrentNews} = sliceStory.actions
export const getLoading = ((state) => state.story.isLoading);

export default sliceStory.reducer;
