import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import "./Card.css"
import { Link } from "react-router-dom"

const Cards = ({movie}) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        },1000)
    }, []) 

    return <>
    {
        isLoading
        ?
        <div className="cards">
           <SkeletonTheme  highlightColor="rgb(194, 187, 187)" baseColor="rgb(43, 36, 36)" >
                <Skeleton height={300}  />
           </SkeletonTheme>
        </div>
        :
        <Link to={`/movies/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" alt="" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} />
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.original_title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.release_date:""}
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                </div>
            </div>
        </Link>
    }
    </>
}
export default Cards
