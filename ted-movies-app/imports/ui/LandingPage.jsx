import React, { useState } from "react"
import Movies from "./Movies";


function LandingPage({ moviesData, setMoviesData }) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [searchText, setSearchText] = useState('')

    return (
        <div className="main-container">
            <div className="form-container">
                {!isSearch ? <button className="button" onClick={() => setIsFavorite(!isFavorite)}>{isFavorite ? "afficher tout les films" : "afficher les favoris"}</button> : <button className="button" onClick={() => setIsSearch(!isSearch)}>revenir aux films</button>}

                <input type="text" placeholder="entrer un titre" id="search-input" onChange={(e) => { setSearchText(e.target.value) }} />
                <button className="button" onClick={() => { setIsSearch(!isSearch) }}>Rechercher</button>
            </div>
            <Movies moviesData={moviesData} setMoviesData={setMoviesData} isFavorite={isFavorite} isSearch={isSearch} searchText={searchText} />
        </div>
    );
}

export default LandingPage;
