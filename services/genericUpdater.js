const service = require("../services/movieService");

exports.genericHateTrueUpdater = (getMovie, checkUserValue, checkDbValue, ref, counterLike, counterHate) => {
    try {
        if (checkDbValue === true && checkUserValue === false) {
            if (ref === "like") {
                let subtractLike = counterLike - 1;
                service.updateLikesAndHatesFromDb(getMovie, subtractLike, counterHate);
            } else {
                let subtractHate = counterHate - 1;
                service.updateLikesAndHatesFromDb(getMovie, counterLike, subtractHate);
            }

        } else if (checkDbValue === false && checkUserValue === true || checkDbValue === false && checkUserValue === false) {
            if (ref === "like") {
                let sumLike = counterLike + 1;
                service.updateLikesAndHatesFromDb(getMovie, sumLike, counterHate);
            } else {
                let sumHate = counterHate + 1;
                service.updateLikesAndHatesFromDb(getMovie, counterLike, sumHate);
            }
        }
    } catch (error) {
        console.log('>> GenericHateTrueUpdater error', error)
        throw error
    }
}