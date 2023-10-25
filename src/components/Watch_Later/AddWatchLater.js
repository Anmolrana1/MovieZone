import React from 'react'
import { useSelector } from 'react-redux'
import Card from "../Card/Card"
function AddWatchLater() {
  const {watchLater,searchData}=useSelector((state)=>state.MovieData);
  console.log("movies watch later",watchLater);
  return (
    <div>
      <div className="movieList">
            <span className="listTitle">WATCH LATER </span>
            <div className="listCards">
            {watchLater.length > 0 ? (
                watchLater
                  .filter((movie)=>{
                    if(searchData && searchData.length === 0){
                      return movie;}
                    else{
                      return movie.title.toLowerCase().includes(searchData.toLowerCase());
                    }
                  })
                  .map((movie) => (
                    <Card key={movie.id} movie={movie} />
                  ))
              ) : (
                <h1>No Movie Is Selected</h1>
              )}
            </div>
        </div>
    </div>
  )
}

export default AddWatchLater