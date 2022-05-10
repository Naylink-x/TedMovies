import axios from "axios";
import React, { useEffect, useState } from "react"


function Test() {

    const [moviesData, setMoviesData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/discover/movie').then((res) => setMoviesData(res.data.results));
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
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default Test;
