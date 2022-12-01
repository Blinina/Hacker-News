import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { url } from '../helps';

export const getData = createAsyncThunk('news/getNews', async () => {
  const res = await axios.get(`${url}/newstories.json?print=pretty`);
  const hundredNews = res.data.slice(170, 220);
  let newArr = [];
  for (const storyId of hundredNews) {
    const oneNew = await axios.get(`${url}/item/${storyId}.json?print=pretty`);
    newArr.push(oneNew.data);
  }
  return newArr;
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
        const { payload } = action;
        newsAdapter.setAll(state, payload);
        state.isLoading = false;
        state.loadingError = null;
      })
      .addCase(getData.pending, (state) => {
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
export const getLoading = ((state) => state.news.isLoading);

export default sliceNews.reducer;

