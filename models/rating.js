
module.exports = (sequelize, Sequelize) => {
    const rating = sequelize.define("rating", {
        likes: {
            type: Sequelize.BOOLEAN
        },
        hates: {
            type: Sequelize.BOOLEAN
        },
        movie_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER
        },
    });

    return rating;
};
