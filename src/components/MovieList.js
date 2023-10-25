import React, { useEffect } from 'react'
import "./MovieList.css"
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { GetPopularMovie } from '../Reducers/MovieReducer';
import Card from "./Card/Card"

function MovieList() {
  const {type}=useParams();
  const dispatch=useDispatch();
  const {movieType,searchData}=useSelector((state)=>state.MovieData);
  useEffect(() => {
    console.log("typewjdfssf",type);
    dispatch(GetPopularMovie({type} || 'popular'));
  }, [type,dispatch]);
  
  return (
    <div>
      <div className="movieList">
            <span className="listTitle">{(type ? type.toUpperCase() : "MOVIES")}</span>
            <div className="listCards">
                {movieType &&
                movieType.filter((movie)=>{
                  if(searchData && searchData.length === 0){
                    return movie;}
                  else{
                    return movie.title.toLowerCase().includes(searchData.toLowerCase());
                  }
                })
                .map(movie => (
                      <Card key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default MovieList;
