import React, { useEffect } from 'react';
import { GetMovie } from '../Reducers/MovieReducer';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from './MovieList';

function Home() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.MovieData.movies);
    useEffect(() => {
    dispatch(GetMovie());
    }, [dispatch])
    return(
        <div>
            <div className='parent_carousel'>
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}>
                    {
                    data.map((ele)=>(
                        <Link style={{textDecoration:"none",color:"white"}} to={`/movies/${ele.id}`} >
                            <div key={ele.id} className='poster_block'>
                            <img className="movie_image" alt="" src={`https://image.tmdb.org/t/p/original${ele && ele.backdrop_path}`}/>
                            </div> 
                            <div className='poster_overlay'>
                                <span className='movie_title'>{ele.title}</span>
                                <span className='movie_data'>{ele.release_date}</span>
                                <div className='movie_description'>
                                    <div className='movie_overview'>{ele.overview.slice(0,200)+"..." }</div>
                                </div>
                            </div> 
                        </Link>
                    ))
                    }
                </Carousel>
            </div>
            <MovieList/>
        </div>
        );
    }
  
export default Home
