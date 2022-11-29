import { configureStore } from '@reduxjs/toolkit';
import newsReduser from './sliceNews';
import storyReduser  from './sliseStory';

export default configureStore({
  reducer: {
    news: newsReduser,
    story: storyReduser,
  },
});