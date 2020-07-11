
module.exports = (sequelize, Sequelize) => {
    const movie = sequelize.define("movie", {
        title: {
            type: Sequelize.STRING,
            unique: true
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.STRING
        },
        like: {
            type: Sequelize.INTEGER
        },
        hate: {
            type: Sequelize.INTEGER
        }
    });

    return movie;
};
