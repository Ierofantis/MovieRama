const db = require("../models");
Movie = db.movie;
User = db.user;

// Create and Save new User
exports.createUser = (user) => {
    return User.create({
        username: user.username,
        email: user.email
    })
        .then((user) => {
            console.log(">> Created movie: " + JSON.stringify(user, null, 4));
            return user;
        })
        .catch((err) => {
            console.log(">> Error while creating movie: ", err);
        });
};

// Create and Save new Movie
exports.createMovie = (userId, movie) => {
    return Movie.create({
        title: movie.title,
        description: movie.description,
        published: movie.published,
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
// Get the movies for a given user
exports.findUserById = (userId) => {
    return User.findByPk(userId, { include: ["movies"] })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            console.log(">> Error while finding Movie: ", err);
        });
};

// Get all users include movies
exports.findAll = () => {
    return User.findAll({
        include: ["movies"],
    }).then((users) => {
        return users;
    });
};