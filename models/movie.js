
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
        user_id: {
            type: Sequelize.INTEGER
        },
        like_counts: {
            type: Sequelize.INTEGER
        },
        hate_counts: {
            type: Sequelize.INTEGER
        },
    });

    return movie;
};
