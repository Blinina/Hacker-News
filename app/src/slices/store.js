import { configureStore } from '@reduxjs/toolkit';
import newsReduser from './sliceNews';
import storyReduser  from './sliceStory';
import commentsReduser from './sliceComments';

export default configureStore({
  reducer: {
    news: newsReduser,
    story: storyReduser,
    comments: commentsReduser,
  },
});