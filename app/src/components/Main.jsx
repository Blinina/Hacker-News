import { React, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, getData, getLoading } from "../slices/sliceNews";
import timeToUTC from '../fn';
import { List,  Alert, Spin } from 'antd';

export default function Main() {
  const dispatch = useDispatch()
  const isLoading = useSelector(getLoading);
  console.log(isLoading)
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const data = useSelector(getNews);
  const dataSort = data.sort((a, b) => b.time - a.time);

  return (<>{isLoading ? (
    <Spin  className="spin-loading" tip="Подождите, идет загрузка...">
    </Spin>
  ) : <List
  itemLayout="horizontal"
  dataSource={dataSort}
  renderItem={(item) => (
  <List.Item>
    <List.Item.Meta
      title={<Link to={`news/${item.id}`}>{item.title}</Link>}
      description={<div><p>Автор: {item.by}</p><p>время публикации: {timeToUTC(item.time)}</p>
        <p>рейтинг: {item.score}</p></div>}
    />
  </List.Item>
  )}
  />
  }
  </>
  )
      
}
