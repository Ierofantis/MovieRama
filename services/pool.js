const pg = require('pg');

const config = {
    user: 'school_reg', //this is the db user credential
    database: 'school_register',
    password: 'school_reg',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to the Database');
});