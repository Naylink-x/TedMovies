import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
import { functions } from './functions';

const LikesCollection = new Mongo.Collection('likes');

Meteor.startup(() => {});

WebApp.connectHandlers.use('/api/discover/movie', (req, res, next) => {

    HTTP.call('GET', functions.theMovieDb('discover'), {}, function(error, response) {

        let newResponse;

        if (!error) {
            // Si la requête aboutie on récupère le résultat (la liste des films), 
            // sinon on affiche un message d'erreur dans la console
            newResponse = response.data;

            newResponse.results.forEach(function(movie) {

                // Pour chaque film on recherche l'id dans notre collection Mongo
                let dbMovie = LikesCollection.findOne({ id: movie.id });

                // Si l'id existe on ajoute l'attribut like au film, sinon on initialise cet attribut à 0
                if (dbMovie) {
                    movie.like = dbMovie.like;
                } else {
                    movie.like = 0;
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

    switch (req) {
        case 'GET':
            break;

        case 'PUT':
            // On récupère l'id du film qui se trouve dans l'URL
            const id = functions.getMovieIdFromUrl(url);
            movie = likedMovie(parseInt(id));

            res.writeHead(200);
            res.write(JSON.stringify(movie));
            break;

        default:
            break;
    }
    res.end();
});

function likedMovie(id) {
    // On cherche l'id du film dans notre collection Mongo
    let dbMovie = LikesCollection.findOne({ id: id });

    // Si l'id existe on incrémente l'attribut like de 1, 
    // sinon on ajoute l'id à la collection et on initialise le nombre de like à 1
    if (dbMovie) {
        LikesCollection.update({ _id: dbMovie._id }, { $inc: { like: 1 } });
    } else {
        LikesCollection.insert({
            id: id,
            like: 1
        });
    }
    // On renvoie l'id et le nombre de like du film
    return LikesCollection.findOne({ id: id });
}