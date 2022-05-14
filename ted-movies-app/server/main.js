import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
import { functions } from './functions';
import { dbAccess } from './db-access'


Meteor.startup(() => { });

WebApp.connectHandlers.use('/api/discover/movie', (req, res, next) => {

    HTTP.call('GET', functions.theMovieDb('discover'), {}, function (error, response) {

        let newResponse;

        if (!error) {
            // Si la requête aboutie on récupère le résultat (la liste des films), 
            // sinon on affiche un message d'erreur dans la console
            newResponse = response.data;

            newResponse.results.forEach(function (movie) {

                // Pour chaque film on recherche l'id dans notre collection Mongo
                //let dbMovie = LikesCollection.findOne({ id: movie.id });
                let dbMovieLiked = dbAccess.isLikedMovie(parseInt(movie.id));
                let dbMovieStarred = dbAccess.isStarredMovie(parseInt(movie.id));

                // Si l'id existe on ajoute l'attribut like au film, sinon on initialise cet attribut à 0
                if (dbMovieLiked) {
                    movie.like = dbMovieLiked.like;
                } else {
                    movie.like = 0;
                }

                if (dbMovieStarred) {
                    movie.star = dbMovieStarred.star;
                } else {
                    movie.star = 0;
                }
            });
        } else {
            res.writeHead(404);
        }

        // On renvoie ensuite la liste des films modifiée
        res.writeHead(200);
        res.write(JSON.stringify(newResponse));
        res.end();
    });
});

WebApp.connectHandlers.use('/api/like/', (req, res, next) => {

    let movie;

    switch (req.method) {
        case 'GET':
            break;

        case 'PUT':
            // On récupère l'id du film qui se trouve dans l'URL
            const id = functions.getMovieIdFromUrl(req.url);
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
            // On récupère l'id du film qui se trouve dans l'URL
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