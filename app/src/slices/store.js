import { configureStore } from '@reduxjs/toolkit';
import newsReduser from './sliceNews';


export default configureStore({
  reducer: {
    news: newsReduser,
  },
});