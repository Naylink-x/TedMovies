export const dbAccess = {
    likedMovie: _likedMovie,
    isLikedMovie: _isLikedMovie,
    starredMovie: _starredMovie,
    isStarredMovie: _isStarredMovie
}

const LikesCollection = new Mongo.Collection('likes');
const StarsCollection = new Mongo.Collection('stars');

function _isLikedMovie(id) {
    return LikesCollection.findOne({ id: id });
}

function _likedMovie(id) {
    // On cherche l'id du film dans notre collection Mongo
    let dbMovie = LikesCollection.findOne({ id: id });

    // Si l'id existe on incrémente l'attribut like de 1, 
    // sinon on ajoute l'id à la collection et on initialise le nombre de like à 1
    if (dbMovie) {
        LikesCollection.update({ id: dbMovie.id }, { $inc: { like: 1 } });
    } else {
        LikesCollection.insert({
            id: id,
            like: 1
        });
    }
    // On renvoie l'id et le nombre de like du film
    return LikesCollection.findOne({ id: id });
}

function _starredMovie(id) {
    // On cherche l'id du film dans notre collection Mongo
    let dbMovie = StarsCollection.findOne({ id: id });

    // Si l'id existe et que l'attribut star = 1 alors on passe la valeur de l'attribut à 0
    // si l'attribut vaut 0 on passe sa valeur à 1
    // sinon on ajoute l'id à la collection et on initialise l'attribut star à 1
    if (dbMovie) {
        if (dbMovie.star === 1) {
            StarsCollection.update({ id: dbMovie.id }, { $set: { star: 0 } });
        } else {
            StarsCollection.update({ id: dbMovie.id }, { $set: { star: 1 } });
        }

    } else {
        StarsCollection.insert({
            id: id,
            star: 1
        });
    }

    return StarsCollection.findOne({ id: id });
}

function _isStarredMovie(id) {
    return StarsCollection.findOne({ id: id });
}