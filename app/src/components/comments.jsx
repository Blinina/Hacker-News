import timeToUTC from '../fn';
import { React, useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { getDataStory, getLoading } from '../slices/sliceStory';
import { getComments, getDataComments, getLoadingComments, getCommentscChildren } from "../slices/sliceComments";

export default function Comments ({elem}){
  const dispatch = useDispatch();
  const { by, text, time, id } = elem;

  function getChildrenComments(el){
    dispatch(getCommentscChildren(el.id));
  }
  // useEffect(() => {
  //       dispatch(getCommentscChildren(elem.id));
  // }, []);
  const childrenCom = useSelector(state => state.comments.children);

  const showChildrenComments = () => {
    return childrenCom.map((kid) => (
      <Comments
      key={kid.id}
          elem={kid}
      />
    ));
  }
  // console.log(childrenCom)

 function createMarkup() {
    return {__html: elem.text};
  }
  function MyComponent() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }

 
    return( <>
    <li key={id}>
              <p><b>{by ? by : 'гость'}</b><b>{':'}</b></p>
              <p className="date">{timeToUTC(time)}</p>
              <p>{text ? <MyComponent/> : <p className="warning">Не удалось найти комментарий</p>}</p>
              {elem.kids && <p onClick={()=>getChildrenComments(elem)} className='link'>Следующие комментарии</p>}
              {childrenCom.length!==0 && <div>{showChildrenComments()}</div> }

               
        </li>
    </>

    )
}