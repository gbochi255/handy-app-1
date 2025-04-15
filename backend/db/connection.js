const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
console.log("ENV is :", ENV);
const path = `${__dirname}/../.env.${ENV}`;
const config = {};
const db = new Pool(config);

require("dotenv").config({ path });

const PORT = process.env.PORT || 3000;

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log("connected to", process.env.PGDATABASE);
}

module.exports = new Pool();
