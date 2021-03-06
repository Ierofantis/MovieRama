const db = require("../models");
Movie = db.movie;
User = db.user;
Rating = db.rating;

/* Sort the movies by likes */
exports.sortByLikes = () => {
    return Movie.findAll({ include: ["user"], order: [['like_counts', 'DESC NULLS LAST']] }).then((movies) => {
        return movies.map(row => {
            return row.dataValues
        });
    }).catch((err) => {
        console.log(">> Error while  Sort the movies by likes: ", err);
    });
};


/* Sort the movies by hates */
exports.sortByHates = () => {
    return Movie.findAll({ include: ["user"], order: [['hate_counts', 'DESC NULLS LAST']] }).then((movies) => {
        return movies.map(row => {
            return row.dataValues
        });
    }).catch((err) => {
        console.log(">> Error while  Sort the movies by hates: ", err);
    });
};


/* Get the movies by date */
exports.sortByDates = () => {
    return Movie.findAll({ include: ["user"], order: [['createdAt', 'DESC']] }).then((movies) => {
        return movies.map(row => {
            return row.dataValues
        });
    }).catch((err) => {
        console.log(">> Error while  Sort the movies by dates: ", err);
    });
};