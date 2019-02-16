var mysql = require('mysql')
var { log,warn,error } = require('../router/utils/util.js')
var mysql_config = {
  host: 'localhost',
  user: 'root',
  password: '123456', //本地是root
  port: '3306',
  database: 'artist'
}

function handleDisconnection() {
  var connection = mysql.createConnection(mysql_config)
  connection.connect(function(err) {
    if (err) {
      log("error when connecting to db:"+ err);
      setTimeout('handleDisconnection()', 2000)
    }
  })

  connection.on('error', function(err) {
    warn('db error :'+ err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      log('db error执行重连:' + err.message)
      handleDisconnection()
    } else {
      throw err
    }
  })
  exports.connection = connection
}

exports.handleDisconnection = handleDisconnection
