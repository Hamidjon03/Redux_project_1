import {useEffect, useCallback} from 'react';
import useHttp from '../hook/useHttp'
import { useSelector, useDispatch } from 'react-redux';
import { newsFetching, newsFetched,newsDeleted, newsFetchingError } from "../redux/acitons";
import Spinner from './Spinner';
import NewsListItems from './NewsListItems';

export default function NewsList(){
  const { filteredNews, filterLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {request} = useHttp();
  
  useEffect(() => {
    dispatch(newsFetching());
    request("http://localhost:3001/news")
    .then(data => dispatch(newsFetched(data)))
    .catch(() => dispatch(newsFetchingError()))
    
    // eslint-disable-next-line
  },[])

  const onDelete = useCallback((id) =>{
    request(`http://localhost:3001/news/${id}`, "DELETE")
      .then((data) => console.log(data + "deleted"))
      .then(dispatch(newsDeleted(id)))
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  },[])

  if (filterLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filterLoadingStatus === "error") {
    return <h1>Error</h1>;
  }

  const renderNewsList = (filteredNews) => {
    if (filteredNews.length === 0) {
      return <h3 className="text-center mt-5 text-danger">NOT FOUND</h3>;
    }

    return filteredNews.map(({ id, ...props }) => {
      return <NewsListItems key={id} onDelete = {() => onDelete(id)} {...props} />;
    }).reverse();
  };

  const element = renderNewsList(filteredNews);

  return <ul>{element}</ul>;
}