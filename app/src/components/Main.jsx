import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, getData } from "../slices/sliceNews";
import timeToUTC from '../fn';
import { List } from 'antd';

export default function Main() {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    useEffect(() => {
        // setTimeout(function() {
            dispatch(getData());
        // }, 30000);
    }, [dispatch]);

    const data = useSelector(getNews);
    const dataSort = data.sort((a, b) => b.time - a.time);
console.log(data)
    function goNew(el){
navigate(`news/${el.id}`)
    }
  
    return (
        <List
    itemLayout="horizontal"
    dataSource={dataSort}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          title={<p className="link" onClick={()=>goNew(item)}>{item.title}</p>}
          description={<div><p>Автор: {item.by}</p><p>время публикации: {timeToUTC(item.time)}</p>
           <p>рейтинг: {item.score}</p></div>}
        />
      </List.Item>
    )}
  />
    )
}
          

// {/* <div>
// <p onClick={()=>goNew(el)}>
//     <p>{el.title}</p>
//     </p>
//     /<p>{el.by}</p>
//     </div>
// <p>время публикации: {timeToUTC(el.time)}</p>
// <p>рейтинг:{el.score}</p> */}

