const ENV = process.env.NODE_ENV || "test";
// const ENV = process.env.NODE_ENV || "development";
require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` });
const { Pool,types } = require("pg");

// console.log("ENV is :", ENV);
const config = {
  
};

// Override DATE type parser (OID 1082)
types.setTypeParser(1082, (value) => value); // Return raw string (YYYY-MM-DD)

const PORT = process.env.PORT || 3000;

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("No PGDATABASE or DATABASE_URL configured");
} else {
  console.log("connected to", process.env.PGDATABASE);
}

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}


const db = new Pool(config);
module.exports = db

