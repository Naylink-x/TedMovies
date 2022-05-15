import { API_URL } from './api-url';
import { dbAccess } from './db-access';

export const functions = {
    theMovieDb: _theMoviedb,
    getMovieIdFromUrl: _getMovieIdFromUrl,
    movieAttribute: _movieAttribute
}

function _theMoviedb(index, query = '') {

    let url;

    switch (index) {
        case 'discover':
            url = API_URL.theMovieDbUrl.website + 'discover/movie?api_key=' + API_URL.theMovieDbUrl.api_key + '&language=fr-FR&include_adult=false';
            break;

        case 'search':
            if (query) {
                url = API_URL.theMovieDbUrl.website + 'search/movie?api_key=' + API_URL.theMovieDbUrl.api_key + '&language=fr-FR&query=' + query + '&include_adult=false';
            }

        default:
            break;
    }

    return url;
}

function _getSearchFromUrl(url) {

}

function _getMovieIdFromUrl(url) {
    return url.split('/')[1];
}

function _movieAttribute(option, movie) {

    switch (option) {
        case 'like':
            // Pour chaque film on recherche l'id dans notre collection Mongo
            let dbMovieLiked = dbAccess.isLikedMovie(parseInt(movie.id));

            // Si l'id existe on ajoute l'attribut like au film, sinon on initialise cet attribut à 0
            if (dbMovieLiked) {
                movie.like = dbMovieLiked.like;
            } else {
                movie.like = 0;
            }
            break;

        case 'star':

            let dbMovieStarred = dbAccess.isStarredMovie(parseInt(movie.id));

            if (dbMovieStarred) {
                movie.star = dbMovieStarred.star;
            } else {
                movie.star = 0;
            }
            break;

        default:
            break;
    }
}