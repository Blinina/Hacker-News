import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'


const url = "https://hacker-news.firebaseio.com/v0/item/2921983.json?print=pretty";
export const getData = createAsyncThunk('news/getData', async (payload) => {
    const res = await axios.get(url, { headers: payload });
    return res.data;
  });
  
  const newsAdapter = createEntityAdapter();

  const initialState = {
    ...newsAdapter.getInitialState(),
  };


const sliceNews = createSlice({
    name: "news",
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(getData.fulfilled, (state, action) => {
            const { text } = action.payload;
            newsAdapter.setAll(state, text);
            console.log(state);
            state.isLoading = false;
            state.loadingError = null;
          })
          .addCase(getData.pending, (state) => {
            console.log(`загрузка: ${state.isLoading}`);
            state.isLoading = true;
            state.loadingError = null;
          })
          .addCase(getData.rejected, (state, action) => {
            console.log('rejected');
            state.isLoading = false;
            state.loadingError = action.error;
          });
      },
    });

export const selectors = newsAdapter.getSelectors((state) => state.news);
export const getNews = (state) => selectors.selectAll(state);

// export const {
//   addChannel, removeChannel, renameChannel, changeChannelID,
// } = sliceChannels.actions;
export default sliceNews.reducer;