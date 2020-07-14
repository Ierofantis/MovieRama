const db = require("../models");
Movie = db.movie;
User = db.user;
Rating = db.rating;


/* Get the movies for a given user */
exports.sortByLikes = (user_id) => {
    //     SELECT * FROM movies 
    //     ORDER BY
    //    "like_counts";
    Movie.findAll({ order: '"like_counts" DESC' })

};


/* Get the movies for a given user */
exports.sortByHates = (user_id) => {
    //     SELECT * FROM movies 
    //     ORDER BY
    //    "hate_counts";

};


/* Get the movies for a given user */
exports.sortByDate = (user_id) => {
    //     SELECT * FROM movies 
    //     ORDER BY
    //    "created_at";
};