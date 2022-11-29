import { React, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStory, getDataStory } from '../slices/sliseStory';
export default function New() {
  const useParamsId = useParams();
  const storyId = useParamsId.id;
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getDataStory(storyId));
  }, [dispatch, storyId]);

  const data = useSelector(getStory);
  console.log(data);

  return (
    <p>kek</p>
  )
  }
  
  // {/* <ul>
// <p></p>




// </ul> */}