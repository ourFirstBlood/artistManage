var mysql = require('mysql')
const colors = require('colors');
colors.setTheme({
  log: 'cyan',
  warn: 'yellow',
  error: 'red'
});
var mysql_config = {
  host: 'localhost',
  user: 'root',
  password: 'root', //本地是root
  port: '3306',
  database: 'artist'
}

function handleDisconnection() {
  var connection = mysql.createConnection(mysql_config)
  connection.connect(function (err) {
    if (err) {
      console.log(("error when connecting to db:" + err).error);
      setTimeout('handleDisconnection()', 2000)
    }
  })

  connection.on('error', function (err) {
    console.log(('db error :' + err).warn)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log(('db error执行重连:' + err.message).log)
      handleDisconnection()
    } else {
      throw err
    }
  })
  exports.connection = connection
}

exports.handleDisconnection = handleDisconnection