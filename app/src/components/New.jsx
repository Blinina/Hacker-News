import { React, useState, useLayoutEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStory, getLoading } from '../slices/sliceStory';
import { getComments, getDataComments } from "../slices/sliceComments";
import { Card, Alert, Spin } from 'antd';
import timeToUTC from '../fn';


export default function New() {
  const useParamsId = useParams();
  const storyId = useParamsId.id;
  const isLoading = useSelector(getLoading)
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    dispatch(getDataStory(storyId));
    dispatch(getDataComments(storyId));
  }, []);

  const data = useSelector(state => state.story.story);
  const comments = useSelector(getComments);
  console.log(comments)

  return (<>{isLoading ? (
    <Spin tip="Loading...">
      <Alert
        message="Подождите, пожалуйта"
        description="идет загрузка новости..."
        type="info"
      />
    </Spin>
  ) : <Card title={data.title} extra={<a className="btn" href={data.url} target="_blunk"><b>ЧИТАТЬ</b></a>
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
          {data.kids ? data.kids.count : 0}
        </span>
      </div>
      <div>
        {data.kids && (<><p><b>Комментарии:</b></p>
          <ul>
            {comments.map((el) => <li>
              <p><b>{el.by ? el.by : 'гость'}</b><b>{':'}</b></p>
              <p>{timeToUTC(el.time)}</p>
              <p>{el.text ? el.text : <p className="warning">Не удалось найти комментарий</p>}</p>
              {el.kids && <p className='link'>Следующие комментарии</p>}
            </li>)}
          </ul>
        </>)}
      </div>
    </div>
  </Card>
  }
  </>
  )
}


