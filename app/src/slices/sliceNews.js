import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const url = "https://hacker-news.firebaseio.com/v0/";
export const getData = createAsyncThunk('news/getNews', async () => {
  const res = await axios.get(`${url}/newstories.json?print=pretty`);
  const hundredNews = res.data.slice(20, 35);
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


export default sliceNews.reducer;


// let newArr2 = [];
//   for (let i =0; i<hundredNews/2; i+=1) {
//     const oneNew = await axios.get(`${url}/item/${hundredNews[i]}.json?print=pretty`);
//     newArr.push(oneNew.data);
//   }
//   for (let i =hundredNews/2; i<hundredNews; i+=1) {
//     const oneNew = await axios.get(`${url}/item/${hundredNews[i]}.json?print=pretty`);
//     newArr2.push(oneNew.data);
//   }
//   return newArr;s