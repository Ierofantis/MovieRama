
module.exports = (sequelize, Sequelize) => {
    const rating = sequelize.define("rating", {
        like: {
            type: Sequelize.BOOLEAN
        },
        hate: {
            type: Sequelize.BOOLEAN
        },
        movieId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
    });

    return rating;
};
