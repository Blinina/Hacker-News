import { React, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, getData, getLoading } from "../slices/sliceNews";

import {List,  Button, Spin } from 'antd';

export default function Main() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const update = () => {
    console.log('обновление')
    dispatch(getData());
  } 

  useEffect(() => {
    update();
    setInterval(() => update(), 60000);
  }, []);


  const data = useSelector(getNews);
  const dataSort = data.sort((a, b) => b.time - a.time);

  return (<>{isLoading ? (
    <Spin className="spin-loading" tip="Подождите, идет загрузка..." />

  ) : <div className="main">
    <div className="btn-contain">
      <Button className="btn-update" onClick={() => update()}>Обновить ленту</Button>
    </div>
    <List
      itemLayout="horizontal"
      dataSource={dataSort}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`news/${item.id}`}>{item.title}</Link>}
            description={<div><p>Автор: {item.by}</p><p>время публикации: {new Date(item.time * 1000).toLocaleString()}</p>
              <p>рейтинг: {item.score}</p>
              <p>Комментарии: {item.descendants}</p></div>}
          />
        </List.Item>
      )}
    />
  </div>
  }
  </>
  )

}
