const qs = require('querystring')
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'artist'
})

connection.connect()

var  sql = 'SELECT * FROM form_custom';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }

       console.log('--------------------------SELECT----------------------------');
       console.log(result[0].id);
       console.log('------------------------------------------------------------\n\n');
});
connection.end();
module.exports
