import { React, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../helps";

export default function Comments({ elem }) {
  const { by, text, time, kids } = elem;
  const [show, setShow] = useState(false);
  const [childrenComments, setchildrenComments] = useState([]);

  function NormalText() {
    return <div className="ml-10" dangerouslySetInnerHTML={{ __html: text }} />
  }

  useEffect(() => {
    getChild();
  }, []);

  const getChild = async () => {
    let arrChildComments = [];
    if (!kids) return;
    for (let kidId of kids) {
      const res = await axios.get(`${url}/item/${kidId}.json?print=pretty`);
      if (res.data !== null) {
        arrChildComments = [...arrChildComments, res.data];
      }
    }
    setchildrenComments(arrChildComments);
  }
  const showSubComments = () => {
    setShow(!show)
  };

  return (<>
    <li>
      <div><b>{by ? by : 'гость'}</b><b>{':'}</b></div>
      <p className="date">{new Date(time * 1000).toLocaleString()}</p>
      <div>{text ? <NormalText /> : <p className="warning">Не удалось найти комментарий</p>}</div>
      {kids && <p onClick={showSubComments} className='link'>{show ? 'Скрыть комментарии' : 'Показать комментарии'}</p>}
      {show && <div className="child-com">{childrenComments.map((kid) => (
        <Comments
          key={kid}
          elem={kid}
        />
      ))}</div>}
    </li>
  </>
  )
}
