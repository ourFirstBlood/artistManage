var mysql = require('mysql')
var mysql_config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'artist'
}

function handleDisconnection() {
  var connection = mysql.createConnection(mysql_config)
  connection.connect(function(err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout('handleDisconnection()', 2000)
    }
  })

  connection.on('error', function(err) {
    console.error('db error', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('db error执行重连:' + err.message)
      handleDisconnection()
    } else {
      throw err
    }
  })
  exports.connection = connection
}

exports.handleDisconnection = handleDisconnection
