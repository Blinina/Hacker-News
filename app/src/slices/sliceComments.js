import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = "https://hacker-news.firebaseio.com/v0/";

export const getDataComments = createAsyncThunk('story/getDataComments', async (payload) => {
    const res = await axios.get(`${url}/item/${payload}.json?print=pretty`);
    const arrCom = [];
    if (res.data.kids) {
        const { kids } = res.data;
        for (const kid of kids) {
            const resCom = await axios.get(`${url}/item/${kid}.json?print=pretty`);
            arrCom.push(resCom.data)
        }
    }
    return arrCom;
});
const commentsAdapter = createEntityAdapter();

const initialState = {
    ...commentsAdapter.getInitialState(),
};

const sliceComments = createSlice({
    name: "comments",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getDataComments.fulfilled, (state, action) => {
                const { payload } = action;
                commentsAdapter.setAll(state, payload);
                state.isLoading = false;
                state.loadingError = null;
            })
            .addCase(getDataComments.pending, (state) => {
                state.isLoading = true;
                state.loadingError = null;
            })
            .addCase(getDataComments.rejected, (state, action) => {
                console.log('rejected');
                state.isLoading = false;
                state.loadingError = action.error;
            });
    },
});


export const selectorsComments = commentsAdapter.getSelectors((state) => state.comments);
export const getComments = (state) => selectorsComments.selectAll(state);


export default sliceComments.reducer;