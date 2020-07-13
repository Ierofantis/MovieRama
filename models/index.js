const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = require("./movie.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.rating = require("./rating.js")(sequelize, Sequelize);

//user to movies
db.user.hasMany(db.movie, { as: "movies" });

//rating to movie
db.rating.belongsTo(db.movie, {
    foreignKey: "movieId",
    as: "movie",
});

db.rating.belongsTo(db.movie, {
    foreignKey: "userId",
    as: "userRatingId",
});

//movies
db.movie.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user"
});

module.exports = db;