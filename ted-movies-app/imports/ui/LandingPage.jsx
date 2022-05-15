import React, { useState } from "react"
import Movies from "./Movies";


function LandingPage({ moviesData, setMoviesData }) {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <div className="main-container">
            <div className="form-container">
                <form action="">
                    <input type="text" placeholder="entrer un titre" id="search-input" />
                    <input className="button" type="submit" value="rechercher" />
                </form>
                <button className="button" onClick={() => setIsFavorite(!isFavorite)}>{isFavorite ? "afficher tout les films" : "afficher les favoris"}</button>
            </div>
            <Movies moviesData={moviesData} setMoviesData={setMoviesData} isFavorite={isFavorite} />
        </div>
    );
}

export default LandingPage;
