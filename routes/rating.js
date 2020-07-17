const express = require('express');
const router = express.Router();
const service = require("../services/movieService");
const conditionService = require("../services/conditionsForLikesAndHates");
const { sequelize } = require("../models");

/* POST add rating. */
router.post('/addRating', async function (req, res) {

    reqUser = req.body.user_id;
    reqMovie = req.body.movie_id;
    reqLike = req.body.like;
    reqHate = req.body.dislike;

    if (req.user) {
        reqUserId = req.user.id;

        if (req.body.user_id != reqUserId) {

            let query = `
        SELECT * FROM ratings 
        WHERE movie_id = ${reqMovie}
        AND user_id = ${reqUserId}`;

            let movieItem = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT
            });

            let queryLikes = `
        SELECT like_counts,hate_counts FROM movies 
        WHERE id = ${reqMovie}
        AND user_id = ${reqUser}`;

            let queryItem = await sequelize.query(queryLikes, {
                type: sequelize.QueryTypes.SELECT
            });

            let check = await service.checkUserAndMovie(movieItem, req)
            let checkFromDb = await service.checkLikesAndHatesFromDb(movieItem)

            if (movieItem.length > 0) {
                let likeCounter = queryItem[0].like_counts;
                let hateCounter = queryItem[0].hate_counts;

                conditionService.conditionsForLikesAndHates(reqMovie, check, checkFromDb, likeCounter, hateCounter)

                service.updateRatingPerUserAndMovie(reqUserId, reqMovie, {
                    likes: typeof check !== "undefined" && check.likeBool === true || typeof check !== "undefined" && check.likeBool === false ? check.likeBool : checkFromDb[Object.keys(checkFromDb)[0]],
                    hates: typeof check !== "undefined" && check.hateBool === true || typeof check !== "undefined" && check.hateBool === false ? check.hateBool : checkFromDb[Object.keys(checkFromDb)[1]],
                    user_id: reqUserId,
                    movie_id: reqMovie
                });
                res.send("you have updated preference")
            } else {

                let queryLikesHatesMovie = `
          SELECT like_counts,hate_counts FROM movies 
          WHERE id = ${reqMovie}`;

                let queryItemLikesAndHates = await sequelize.query(queryLikesHatesMovie, {
                    type: sequelize.QueryTypes.SELECT
                });

                let InitlikeCounter = 0;
                let initHateCounter = 0;
                let likeUpdatedCounter = queryItemLikesAndHates[0].like_counts ? queryItemLikesAndHates[0].like_counts + 1 : InitlikeCounter += 1;
                let hateUpdatedCounter = queryItemLikesAndHates[0].hate_counts ? queryItemLikesAndHates[0].hate_counts + 1 : initHateCounter += 1;

                reqLike ? service.updateLikesAndHatesFromDb(reqMovie, likeUpdatedCounter, queryItemLikesAndHates[0].hate_counts) : service.updateLikesAndHatesFromDb(reqMovie, queryItemLikesAndHates[0].like_counts, hateUpdatedCounter)
                service.createRatingPerUserAndMovie(reqUserId, reqMovie, {
                    likes: reqLike ? true : false,
                    hates: reqHate ? true : false,
                    user_id: reqUserId,
                    movie_id: reqMovie
                });
                res.send("you have created preference")
            }
        } else {
            res.send("You can't vote your movie !")
        }
    } else {
        res.send("You have to be logged in !")
    }
});

module.exports = router;
