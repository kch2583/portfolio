var mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kimchan8855",
  port: 3306,
  database: "opendart",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("mysql connected");
});
