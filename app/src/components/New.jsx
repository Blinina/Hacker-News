import { React, useState, useLayoutEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStory, getLoading } from '../slices/sliceStory';
import { getComments, getDataComments, getLoadingComments } from "../slices/sliceComments";
import { Card, Spin } from 'antd';
import Comments from "./comments";

export default function New() {
  const useParamsId = useParams();
  const storyId = useParamsId.id;
  const isLoading = useSelector(getLoading);
  const commentsIsLoading = useSelector(getLoadingComments);
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    dispatch(getDataStory(storyId));
    dispatch(getDataComments(storyId));
  }, []);

  const data = useSelector(state => state.story.story);
  const comments = useSelector(getComments);

  return (<>{isLoading ? (
    <Spin className="spin-loading" tip="Подождите, идет загрузка новости..." />
  ) : <Card title={data.title} extra={<a className="btn" href={data.url} target="_blunk"><b>ЧИТАТЬ</b></a>
  } style={{ width: 300 }}>
    <div>
      <div>
        <span>
          <b>{'Дата создания: '}</b>
          {new Date(data.time * 1000).toLocaleString()}
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
      <div>
        {data.kids && (<><p><b>Комментарии:</b></p>
          {commentsIsLoading ? (<Spin className="spin-loading" tip="Комментарии загружаютcя..." />) : (<ul>
            {comments.map((el) => <Comments elem={el} key={el.id} />)}
          </ul>)}
        </>)}
      </div>
    </div>
  </Card>
  }
  </>
  )
}


