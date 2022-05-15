import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
import { functions } from './functions';
import { dbAccess } from './db-access'


Meteor.startup(() => {});

WebApp.connectHandlers.use('/api/discover/movie', (req, res, next) => {

    HTTP.call('GET', functions.theMovieDb('discover'), {}, function(error, response) {

        let newResponse;

        if (!error) {
            // Si la requête aboutie on récupère le résultat (la liste des films), 
            // sinon on affiche une erreur 404
            newResponse = response.data;

            newResponse.results.forEach(function(movie) {

                // Ajout des attributs 'like' et 'star' à chaque film
                functions.movieAttribute('like', movie);
                functions.movieAttribute('star', movie);

            });

            // On renvoie ensuite la liste des films modifiée
            res.writeHead(200);
            res.write(JSON.stringify(newResponse));
        } else {
            res.writeHead(404);
        }
        res.end();
    });
});

WebApp.connectHandlers.use('/api/search/movie', (req, res, next) => {

    switch (req.method) {
        case 'GET':
            break;

        case 'PUT':

            query = functions.getMovieIdFromUrl(req.url);

            HTTP.call('GET', functions.theMovieDb('search', query), {}, function(error, response) {
                if (!error) {
                    res.writeHead(200);
                    res.write(JSON.stringify(response));
                } else {
                    res.writeHead(404);
                }
                res.end();
            });

        default:
            break;
    }
});

WebApp.connectHandlers.use('/api/like/', (req, res, next) => {

    let movie;

    switch (req.method) {
        case 'GET':
            break;

        case 'PUT':
            // On récupère l'id du film qui se trouve dans l'URL
            const id = functions.getMovieIdFromUrl(req.url);

            // Modification de la valeur de l'attribut 'like' dans la collection Mongo
            movie = dbAccess.likedMovie(parseInt(id));

            res.writeHead(200);
            res.write(JSON.stringify(movie));
            break;

        default:
            break;
    }
    res.end();
});

WebApp.connectHandlers.use('/api/star/', (req, res, next) => {

    let movie;

    switch (req.method) {
        case 'GET':
            break;

        case 'PUT':

            const id = functions.getMovieIdFromUrl(req.url);

            movie = dbAccess.starredMovie(parseInt(id));

            res.writeHead(200);
            res.write(JSON.stringify(movie));
            break;

        default:
            break;
    }
    res.end();
});