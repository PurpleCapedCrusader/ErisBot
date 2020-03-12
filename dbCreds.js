var pg = require('pg');
const config = require("./config.json");

var dbCreds = {
  user: config.connUser,
  database: config.connDatabase,
  password: config.connPassword,
  host: config.connHost,
  port: config.connPort,
  max: config.connMax,
  idleTimeoutMillis: config.connIdleTimeoutMillis,
};

//var dbConn = new pg.dbConn(dbCreds);
module.exports = dbCreds;