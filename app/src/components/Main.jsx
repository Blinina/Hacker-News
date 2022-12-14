import { React, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, getData, getLoading } from "../slices/sliceNews";

import { List, Button, Spin } from 'antd';

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

  return (<>
    {isLoading ?
      (<Spin className="spin-loading" tip="Подождите, идет загрузка..." />)
      :
      <div className="main">
        <div className="btn-contain">
          <Button className="btn-update" onClick={() => update()}>Обновить ленту</Button>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={dataSort}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<Link to={`story/${item.id}`}>{item.title}</Link>}
                description={<div><p>Автор: {item.by}</p><p>Время публикации: {new Date(item.time * 1000).toLocaleString()}</p>
                  <p>Рейтинг: {item.score}</p>
                </div>}
              />
            </List.Item>
          )}
        />
      </div>
    }
  </>
  )
}
