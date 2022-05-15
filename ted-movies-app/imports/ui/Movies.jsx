import React, { useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { FaThumbsUp, FaStar } from "react-icons/fa";
import handleClick from "../front-end-functions/handleClick";
import toggleStarState from "../front-end-functions/toggleStarState";


function Movies({ moviesData, setMoviesData, isFavorite, isSearch, searchText }) {
    useEffect(() => {
        if (isSearch === true) {

            axios.put(`http://localhost:3000/api/search/movie/${searchText}`).then((res) => setMoviesData(res.data.data.results));
        }

        if (isSearch === false) {
            axios.get("http://localhost:3000/api/discover/movie").then((res) => setMoviesData(res.data.results));
        }
    }, [moviesData]);
    return (
        <div className="result">
            {moviesData.map((movie, index) => {
                if (isFavorite && !movie.star) {
                    return null
                }
                return (
                    <Card>
                        <div>
                            <h2 className="movie-title" key={index}>{movie.title}</h2>
                            <img className="poster" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="" />
                            <span className="counters" >{movie.like}</span>
                            {!isSearch ? <span><button className="like" onClick={() => handleClick(movie.id, 'like', moviesData, setMoviesData)}><FaThumbsUp /></button><button className={toggleStarState(movie.star) ? 'star' : 'nostar'} onClick={() => { handleClick(movie.id, 'star'); }}><FaStar /></button></span> : null}
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default Movies;