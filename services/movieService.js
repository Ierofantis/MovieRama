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
exports.createMovie = (userId, movie) => {
    return Movie.create({
        title: movie.title,
        description: movie.description,
        userId: userId
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
exports.findUserById = (userId) => {
    return User.findByPk(userId, { include: ["movies"] })
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

/* Create and Save new Rating Per User */
exports.createMovie = (userId, movie) => {
    return Movie.create({
        title: movie.title,
        description: movie.description,
        userId: userId
    })
        .then((movie) => {
            console.log(">> Created movie: " + JSON.stringify(movie, null, 8));
            return movie;
        })
        .catch((err) => {
            console.log(">> Error while creating movie: ", err);
        });
}