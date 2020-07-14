const service = require("../services/movieService");

exports.conditionsForLikesAndHates = (check, checkFromDb, likeCounter, hateCounter) => {

    if (checkFromDb[Object.keys(checkFromDb)[0]] === true && check.likeBool === false) {
        let subtractLike = likeCounter - 1;
        service.updateLikesAndHatesFromDb(reqMovie, subtractLike, hateCounter)
    } else if (checkFromDb[Object.keys(checkFromDb)[0]] === false && check.likeBool === true) {
        let addLike = likeCounter + 1
        service.updateLikesAndHatesFromDb(reqMovie, addLike, hateCounter)
    } else if (checkFromDb[Object.keys(checkFromDb)[0]] === false && check.likeBool === false) {
        let addLike = likeCounter + 1
        service.updateLikesAndHatesFromDb(reqMovie, addLike, hateCounter)
    }
    else if (checkFromDb[Object.keys(checkFromDb)[0]] === false && check.likeBool === true) {
        let addLike = likeCounter + 1
        service.updateLikesAndHatesFromDb(reqMovie, addLike, hateCounter)
    }

    if (checkFromDb[Object.keys(checkFromDb)[1]] === true && check.hateBool === false) {
        let subtractHate = hateCounter - 1;
        service.updateLikesAndHatesFromDb(reqMovie, likeCounter, subtractHate)
    } else if (checkFromDb[Object.keys(checkFromDb)[1]] === false && check.hateBool === true) {
        let addHate = hateCounter + 1
        service.updateLikesAndHatesFromDb(reqMovie, likeCounter, addHate)
    } else if (checkFromDb[Object.keys(checkFromDb)[1]] === false && check.hateBool === false) {
        let addHate = hateCounter + 1
        service.updateLikesAndHatesFromDb(reqMovie, likeCounter, addHate)
    }
    else if (checkFromDb[Object.keys(checkFromDb)[1]] === false && check.hateBool === true) {
        let addHate = hateCounter + 1
        service.updateLikesAndHatesFromDb(reqMovie, likeCounter, addHate)
    }
};