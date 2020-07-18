const service = require("../services/movieService");

exports.conditionsForLikesAndHates = (reqMovie, check, checkFromDb, likeCounter, hateCounter) => {

    try {
        if (typeof check !== "undefined") {
            if (checkFromDb[Object.keys(checkFromDb)[0]] === true & check.likeBool === false) {
                let subtractLike = likeCounter - 1;
                service.updateLikesAndHatesFromDb(reqMovie, subtractLike, hateCounter);
            }
            else if (checkFromDb[Object.keys(checkFromDb)[0]] === false & check.likeBool === true || checkFromDb[Object.keys(checkFromDb)[0]] === false & check.likeBool === false) {
                let sumLike = likeCounter + 1;
                service.updateLikesAndHatesFromDb(reqMovie, sumLike, hateCounter);
            }

            if (checkFromDb[Object.keys(checkFromDb)[1]] === true & check.hateBool === false) {
                let subtractHate = hateCounter - 1;
                service.updateLikesAndHatesFromDb(reqMovie, likeCounter, subtractHate);
            }
            else if (checkFromDb[Object.keys(checkFromDb)[1]] === false & check.hateBool === true || checkFromDb[Object.keys(checkFromDb)[1]] === false & check.hateBool === false) {
                let sumHate = hateCounter + 1;
                service.updateLikesAndHatesFromDb(reqMovie, likeCounter, sumHate);
            }
            else {
                console.log(">> Error on conditionsForLikesAndHates");
            }
        } else {
            console.log('>> conditionsForLikesAndHates undefined')
        }
    }
    catch (error) {
        console.log('>> conditionsForLikesAndHates error', error)
        throw error
    }
};