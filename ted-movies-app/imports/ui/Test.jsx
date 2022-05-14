import axios from "axios";
import React, { useEffect, useState } from "react"
import { FaAccessibleIcon } from "react-icons/fa";


function Test() {

    const [moviesData, setMoviesData] = useState([])
    const handleClick = (movie) => {
        axios.put(`http://localhost:3000/api/like/${movie}`).then(resp => {
            const newData = [...moviesData]
            newData.map((el, index) => {
                if (resp.data.id === el.id) {
                    el.like = resp.data.like
                }
            })

            setMoviesData(newData);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:3000/api/discover/movie").then((res) => setMoviesData(res.data.results));
    }, []);

    return (
        <div className="form-component">
            <div className="form-container">
                <form action="">
                    <input type="text" placeholder="entrer un titre" id="search-input" />
                    <input type="submit" value="rechercher" />
                </form>
            </div>
            <div className="result">
                {moviesData.map((movie, index) => {
                    return (
                        <div>
                            <h2 key={index}>{movie.title}</h2>
                            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="" />
                            <button onClick={() => handleClick(movie.id)}>Like</button>
                            <span className="like"><FaAccessibleIcon /></span>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default Test;
