import { React, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStory, getDataStory } from '../slices/sliceStory';
import { getComments, getDataComments } from "../slices/sliceComments";
import { Card } from 'antd';
import timeToUTC from '../fn';


export default function New() {
  const useParamsId = useParams();
  const storyId = useParamsId.id;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDataStory(storyId));
    dispatch(getDataComments(storyId));
}, [dispatch, storyId]);



  const data = {...useSelector(getStory)[0]};
  const comments = useSelector(getComments);
  console.log(comments)

  return ( <>
    <Card title={data.title} extra={<a href={data.url} target="_blunk">{' Читать'}</a> 
} style={{ width: 300 }}>
      <div>
      <div>
					<span>
						<b>{'Дата создания: '}</b>
						{timeToUTC(data.time)}
					</span>
          </div>
        <div>
					<span className='ml-2'><b>{'Автор: '}</b>{data.by}</span>
          </div>
          <div>
					<span>
						<b>{'Число комментариев: '}</b>
						{data.descendants}
					</span>
          </div>
				</div>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </>
    
  )
  }
  
  // {/* <ul>
// <p></p>




// </ul> */}