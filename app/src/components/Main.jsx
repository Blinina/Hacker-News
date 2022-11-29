import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, getData } from "../slices/sliceNews";
import New from "./New";
import { render } from "react-dom";
export default function Main() {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getData());
    }, [dispatch]);

    const data = useSelector(getNews);
    const dataSort = data.sort((a, b) => b.time - a.time);
    
    function timeToUTC(unixTime) {
        const a = new Date(unixTime * 1000);
        // const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = a.getFullYear();
        const month = a.getMonth();
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const time = date + '.' + month + '.' + year + ' ' + hour + ':' + min;
        return time;
    }
    function goNew(el){
navigate(`news/${el.id}`)
    }
  
    return (
        <ul>
            {dataSort.map((el) => <li key={el.id}>
                <div>
                <p onClick={()=>goNew(el)}>
                    <p>{el.title}</p>
                    </p>
                    /<p>{el.by}</p>
                    </div>
                <p>время публикации: {timeToUTC(el.time)}</p>
                <p>рейтинг:{el.score}</p>
            </li>)}
        </ul>

    );
}
