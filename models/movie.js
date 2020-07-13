
module.exports = (sequelize, Sequelize) => {
    const movie = sequelize.define("movie", {
        title: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: Sequelize.STRING
        },
        likes: {
            type: Sequelize.INTEGER
        },
        hates: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
    });

    return movie;
};
