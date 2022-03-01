import { useEffect } from "react";
import useHttp from "../hook/useHttp";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import classNames from "classnames";
import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} from "../redux/acitons";

export default function NewsFilter() {
  const { filters, filterLoadingStatus, activeFilter } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  if(filterLoadingStatus === 'loading'){
    return <Spinner/>
  } else if (filterLoadingStatus === "error"){
      return <h2 className="text-center mt-5 text-danger">Error</h2>
  }

  const renderFilters = (arr) => {
    if(arr.length === 0){
      return (
        <h5 className="text-center mt-5 text-danger">Filters doesnt found</h5>
      );
    }

    return arr.map(({name, className, label}) => {
      const btnClasses = classNames("btn", className, {
        'active': name === activeFilter
      });
      return (
        <button
          key={name}
          id={name}
          className={btnClasses}
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    })
  }

  const elements = renderFilters(filters)

    return (
      <div className="card shadow-lg mt-4">
        <div className="card-body">
          <p>Filter by category</p>
          <div className="btn-group">
            {elements}
          </div>
        </div>
      </div>
    );
}
