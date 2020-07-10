module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    user.associate = models => {
        user.hasMany(models.movie, { onDelete: 'CASCADE' });
    };

    user.findByLogin = async login => {
        let user = await user.findOne({
            where: { username: login },
        });

        if (!user) {
            user = await user.findOne({
                where: { email: login },
            });
        }

        return user;
    };

    return user;
};