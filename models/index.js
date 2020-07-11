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

//user
db.user.hasMany(db.movie, { as: "movies" });

//movies
db.movie.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user",
});

module.exports = db;