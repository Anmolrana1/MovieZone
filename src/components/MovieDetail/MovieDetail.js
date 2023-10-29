import React, { useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { GetMovie, GetMovieById, watchLater } from '../../Reducers/MovieReducer'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import "./MovieDetail.css"
import Card from '../Card/Card';
export default function MovieDetail() {
    const {id}=useParams();
    const dispatch = useDispatch();
    const currentMovie = useSelector((state) => state.MovieData.movieById);
    const data = useSelector((state) => state.MovieData.movies);
    useEffect(()=>{
        dispatch(GetMovieById({id}))
        dispatch(GetMovie());
    },[dispatch,id])
   
    return (
        <div className="movie">
          <div className='cover_parent'>
            <img className="coverPosterByid" alt="img" src={`https://image.tmdb.org/t/p/original${currentMovie ? currentMovie.backdrop_path : ""}`} />
            <div className='details_cover'>
                <div className='detailsLeft'>
                    <img className="movie_poster" alt="img" src={`https://image.tmdb.org/t/p/original${currentMovie ? currentMovie.poster_path : ""}`} />
                </div>
                <div className='detailsRight'>
                    <div className='detailsRight_top'>
                        <div className="movie__name">{currentMovie ? currentMovie.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovie ? currentMovie.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovie ? currentMovie.vote_average: ""} 
                            <span className="movie__voteCount">{currentMovie ? "(" + currentMovie.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovie ? currentMovie.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovie ? "Release date: " + currentMovie.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovie && currentMovie.genres
                                ? 
                                currentMovie.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                        <button className='watch_later' onClick={() => {
                            console.log("Adding to watch later:", currentMovie);
                            dispatch(watchLater(currentMovie));
                            }}>Add to watch later</button>
                    </div>
                    <div className='detailsRight_bottom'>
                        <div>
                            <div className="synopsisText">SUMMARY</div>
                                {currentMovie ? currentMovie.overview : ""}
                        </div>
                        
                    </div>
                </div>
            </div>
          </div>
          <div className='movie_carousel'>
            <Carousel
            autoPlay={true}
            transitionTime={500}
            transitionTimeUnit="ms"
            infiniteLoop={true}
            centerMode={true} 
            showIndicators={false}
            centerSlidePercentage={13} 
            >
                { data.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                 ))}
            </Carousel>
        </div>
          <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovie && currentMovie.production_companies && currentMovie.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" alt="sfas" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span className='productin_name'>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>   
           
            <div className="movie__heading">Useful Links</div>
            <div className="movie__links">
                
                {
                    currentMovie && currentMovie.homepage && <a href={currentMovie.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__Button">Homepage</span></p></a>
                }
                {
                    currentMovie && currentMovie.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovie.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__Button">IMDb</span></p></a>
                }
            </div>
        </div>
    )
}

