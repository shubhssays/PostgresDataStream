require("dotenv").config();
var QueryStream = require("pg-query-stream");
const { Pool } = require("pg");
const fs = require("fs");

(async () => {
  const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });
  const client = await pool.connect();

  const sql = `SELECT * from users`;
  /*
   Suppose, users table contains millions of  rows and for some reason we want to fetch them all. So, instead of fetching
   the data all at once, we will fetch them in chunks to reduce RAM consumption.
  */

  var query = new QueryStream(sql);
  var stream = client.query(query);
  stream.on("end", () => {
    console.log("stream has ended");
    fs.appendFile("log_file1.json", `\n ] \n `, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("saved");
      }
    });
  });

  fs.appendFile("log_file1.json", `\n [ \n `, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("saved");
    }
  });

  let i = 0;
  stream.on("data", (data) => {
    if (i == 0) {
      fs.appendFile(
        "log_file1.json",
        `\n ${JSON.stringify(data)} \n `,
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("saved");
          }
        }
      );
      i = i+1;
    } else {
      fs.appendFile(
        "log_file1.json",
        `\n , ${JSON.stringify(data)} \n `,
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("saved");
          }
        }
      );
    }
  });
})();
