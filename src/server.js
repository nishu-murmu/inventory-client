var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "nishu",
  password: "test1234",
  database: 'test2'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (firstname, lastname, email, password) VALUES ('Nishu', 'Murmu', 'nishumurmu017@gmail.com', 'nishu&amos$$')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log('1 record inserted')
  })
});