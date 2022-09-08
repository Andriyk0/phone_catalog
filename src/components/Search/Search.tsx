import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../../store';
import { getPath, getQuery } from '../../store/selectors';
import './Search.scss';

export const Search:React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector(getQuery);
  const path = useSelector(getPath);

  return (
    <div className="search__box">
      <label htmlFor="search">
        <img
          className="search__image"
          src="./images/Search.svg"
          alt=""
        />
      </label>
      <input
        id="search"
        className="search"
        placeholder={`Search in ${path}...`}
        type="text"
        value={query}
        onChange={(event) => dispatch(setQuery(event.target.value))}
      />
    </div>
  );
};
