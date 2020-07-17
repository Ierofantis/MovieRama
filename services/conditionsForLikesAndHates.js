const genericService = require("../services/genericUpdater");

exports.conditionsForLikesAndHates = (reqMovie, check, checkFromDb, likeCounter, hateCounter) => {

    if (typeof check !== "undefined") {
        if (checkFromDb[Object.keys(checkFromDb)[0]]) {
            genericService.genericHateTrueUpdater(reqMovie, check.likeBool, checkFromDb[Object.keys(checkFromDb)[0]], "like", likeCounter, hateCounter)
        } else if (checkFromDb[Object.keys(checkFromDb)[1]]) {
            genericService.genericHateTrueUpdater(reqMovie, check.hateBool, checkFromDb[Object.keys(checkFromDb)[1]], "hate", likeCounter, hateCounter)
        }
    } else {
        console.log(">> Error on conditionsForLikesAndHates");
    }
};