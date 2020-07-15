const db = require("../models");
Movie = db.movie;
User = db.user;
Rating = db.rating;

/* Create and Save new User */
exports.createUser = (user) => {
    return User.create({
        username: user.username,
        email: user.email
    })
        .then((user) => {
            console.log(">> Created user: " + JSON.stringify(user, null, 4));
            return user;
        })
        .catch((err) => {
            console.log(">> Error while creating user: ", err);
        });
};

/* Create and Save new Movie */
exports.createMovie = (user_id, movie) => {
    return Movie.create({
        title: movie.title,
        description: movie.description,
        user_id: user_id
    })
        .then((movie) => {
            console.log(">> Created movie: " + JSON.stringify(movie, null, 8));
            return movie;
        })
        .catch((err) => {
            console.log(">> Error while creating movie: ", err);
        });
}

/* Get the movies for a given user */
exports.findUserById = (user_id) => {
    return User.findByPk(user_id, { include: ["movies"] })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            console.log(">> Error while finding Movie: ", err);
        });
};

/* Get all users include movies */
exports.findAllUsersAndMovies = () => {
    return User.findAll({
        include: ["movies"],
    }).then((users) => {
        return users;
    });
};

/* Get all movies */
exports.findAllMovies = () => {
    return Movie.findAll({
        include: ["user"],
    }).then((movies) => {
        return movies.map(row => {
            return row.dataValues
        });
    }).catch((err) => {
        console.log(">> Error while finding All Movies: ", err);
    });
};

/* Update Rating For User */
exports.updateRatingPerUserAndMovie = (user_id, movie_id, rating) => {
    return Rating.update({
        likes: rating.likes,
        hates: rating.hates,
        user_id: user_id,
        movie_id: movie_id
    }, { where: { user_id: user_id } })
        .then((rating) => {
            console.log(">> Update Rating Per User: " + JSON.stringify(rating, null, 7));
            return rating;
        })
        .catch((err) => {
            console.log(">> Error while Update Rating Per User: ", err);
        });
}

/* Create Rating For User */
exports.createRatingPerUserAndMovie = (user_id, movie_id, rating) => {
    return Rating.create({
        likes: rating.likes,
        hates: rating.hates,
        user_id: user_id,
        movie_id: movie_id
    })
        .then((rating) => {
            console.log(">> Create and Save new Rating Per User: " + JSON.stringify(rating, null, 7));
            return rating;
        })
        .catch((err) => {
            console.log(">> Error while Create and Save new Rating Per User: ", err);
        });
}

/*exports Check User and Movies */
exports.checkUserAndMovie = (movieItem, req) => {
    var likeBool = "likeBool";
    var hateBool = "hateBool";
    let boolArgs = {};

    for (i in movieItem) {
        if (movieItem[i].likes === false || movieItem[i].hates === false) {
            if (req.body.like && movieItem[i].hates === false) {
                movieItem[i].likes === true ? boolArgs[likeBool] = false : boolArgs[likeBool] = true;
                return boolArgs;
            } else if (req.body.like && movieItem[i].hates === true) {
                return "you have already hated";
            }
            if (req.body.dislike && movieItem[i].likes === false) {
                movieItem[i].hates === true ? boolArgs[hateBool] = false : boolArgs[hateBool] = true;
                return boolArgs;
            } else if (req.body.like && movieItem[i].likes === true) {
                return "you have already liked";
            }
        }
        else {
            return "You have to Like/Unlike or Hate/Unhate";
        }
    }
}

/* Check Likes And Hates From DB */
exports.checkLikesAndHatesFromDb = (movieItem, req) => {

    let likeFromDb = "likeBool";
    let hateFromDb = "hateBool"
    let boolArgs = {};

    for (i in movieItem) {
        boolArgs[likeFromDb] = movieItem[i].likes;
        boolArgs[hateFromDb] = movieItem[i].hates;
    }
    return boolArgs;
}

/* Update Likes And Hates to Movie DB */
exports.updateLikesAndHatesFromDb = (req, like, hate) => {
    return Movie.update({
        like_counts: like,
        hate_counts: hate,
    }, { where: { id: req } })
        .then((movieRating) => {
            console.log(">> Update Likes And Hates to Movie DB");
            return movieRating;
        })
        .catch((err) => {
            console.log(">> Error while Update Likes And Hates to Movie DB: ", err);
        });
}

/* Get the movies for a given user id */
exports.findMoviesByUser = (user_id) => {
    return Movie.findAll({
        where: {
            user_id: 2
        }, include: ["user"],
    })
        .then((movies) => {
            return movies.map(row => {
                return row.dataValues
            });
        })
        .catch((err) => {
            console.log(">> Error while finding Movie: ", err);
        });
};