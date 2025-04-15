const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const path = `${__dirname}/.env.${ENV}`;
const db = new Pool();

require("dotenv").config({ path });

const PORT = process.env.PORT || 3000;

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log("connected to", process.env.PGDATABASE);
}

module.exports = db;
module.exports = PORT;
