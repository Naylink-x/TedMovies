import { API_URL } from './api-url';

export const functions = {
    theMovieDb: _theMoviedb,
    getMovieIdFromUrl: _getMovieIdFromUrl
}

function _theMoviedb(index) {

    let url;

    if (index === 'discover') {
        url = API_URL.theMovieDbUrl.website + 'discover/movie?api_key=' + API_URL.theMovieDbUrl.api_key + '&language=fr-FR';
    }

    return url;
}

function _getMovieIdFromUrl(url) {
    return url.split('/')[1];
}