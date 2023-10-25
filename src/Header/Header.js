import React, { useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import "./Header.css";
import { serachMovie } from '../Reducers/MovieReducer';
import { useDispatch,useSelector } from 'react-redux';

const Header = () => {
  const [searchData,setserachData]=useState("");
  const dispatch=useDispatch();
  const location=useLocation();
  const watchLaterData=useSelector((state)=>state.MovieData.watchLater);
  useEffect(()=>{
      dispatch(serachMovie(searchData))
  },[searchData,location.pathname,dispatch]);

  useEffect(()=>{
    setserachData("")
},[location.pathname]);
  return (
    <div className='nav'>
      <div className='navleft'>
        <Link to="/">
          <img className='logo_img' alt="" src="https://i.pinimg.com/736x/ea/8d/11/ea8d11f1ffc6355b8a440106ce61d0f3.jpg" />
        </Link>
        <Link to="/movie/popular" style={{textDecoration:"none"}}>
          <span>Popular</span>
        </Link>
        <Link to="/movie/top_rated" style={{textDecoration:"none"}}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movie/upcoming" style={{textDecoration:"none"}}>
          <span>Upcoming</span>
        </Link>
        <Link to="/movieR/Recommend" style={{textDecoration:"none"}}>
          <span>Recommend Movie</span>
        </Link>
        <Link to="/movieK/Watch_Later" style={{textDecoration:"none"}}>
          <span>Watch Later{"("+watchLaterData.length+")"}</span>
        </Link>
      </div>
      <div className='navRight'>
        <input className='searchBar' value={searchData} onChange={(e)=>setserachData(e.target.value)} placeholder='search...' />
        
      </div>
    </div>
  );
}

export default Header;
