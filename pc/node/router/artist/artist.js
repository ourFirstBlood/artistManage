var qs = require('querystring')
var mysqlconnection = require('../../mysql/index.js')
mysqlconnection.handleDisconnection()
exports.add_artists = (req, res) => {
  var connection = mysqlconnection.connection
  let { id, info } = req.body
  let _info = {}
  if (!id || !info) {
    res.send({ code: 999, data: [], msg: '参数不完整' })
    return
  }
  try {
    _info = JSON.parse(info)
  } catch (e) {
    res.send({ code: 999, data: [], msg: '数据格式错误' })
    return
  }
  if (id == 0) {
    var sql = 'INSERT INTO artistsList(id,info) VALUES(0,?)'
    connection.query(sql, [qs.stringify(qs.parse(info))], function(
      err,
      result
    ) {
      if (err) {
        res.send({ code: 0, data: [], msg: err.message })
        return
      }
      res.send({ code: 0, data: [], msg: '成功' })
    })
  } else {
    var userModSql = 'UPDATE artistsList SET info = ? WHERE id =' + id
    var userModSql_Params = [qs.stringify(qs.parse(info))]
    connection.query(userModSql, userModSql_Params, function(err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message)
        res.send({ code: 999, data: [], msg: err.message })
        return
      }
      res.send({ code: 0, data: [], msg: '成功' })
    })
  }
}

exports.detele_artists = (req, res) => {
  var connection = mysqlconnection.connection
  let id = ''
  let ids = []
  try {
    id = JSON.parse(req.body.id)
  } catch (e) {
    res.send({ code: 999, data: [], msg: '数据格式错误' })
    return
  }
  if (id instanceof Array) {
    ids = id
  } else {
    ids = [id]
  }
  let sqlArr = '('+ids.join(',')+')'
  var sql = 'DELETE FROM artistsList WHERE id IN ' + sqlArr
  connection.query(sql, function(err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      res.send({ code: 999, data: [], msg: err.message })
      return
    }
    res.send({
      code: 0,
      data: [],
      msg: '成功'
    })
  })
}

exports.detail = (req, res) => {
  var connection = mysqlconnection.connection
  var sql = 'SELECT * FROM artistsList WHERE id = ' + req.body.id
  connection.query(sql, function(err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      res.send({ code: 999, data: [], msg: err.message })
      return
    }
    if (!result.length) {
      res.send({ code: 999, data: [], msg: '该数据不存在' })
      return
    }
    res.send({
      code: 0,
      data: (function() {
        let arrStr = ''
        for (let key in qs.parse(result[0].info)) {
          arrStr = key
        }
        return JSON.parse(arrStr)
      })(),
      msg: '成功'
    })
  })
}

exports.get_artistsList = (req, res) => {
  var connection = mysqlconnection.connection
  let { page, page_size } = req.body
  var countSql = 'SELECT count(*) FROM artistsList'
  connection.query(countSql, function(err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      res.send({ code: 999, data: [], msg: err.message })
      return
    }
    let count = result[0]['count(*)']
    var sql =
      'SELECT * FROM artistsList limit ' +
      (page - 1) * page_size +
      ',' +
      page_size
    //查
    connection.query(sql, function(err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
        res.send({ code: 999, data: [], msg: err.message })
        return
      }
      let list = []
      result.forEach(item => {
        let arrStr = ''
        for (let key in qs.parse(item.info)) {
          arrStr = key
        }
        list.push({
          id: item.id,
          info: JSON.parse(arrStr)
        })
      })
      res.send({
        code: 0,
        data: {
          count: count,
          list: list
        },
        msg: '成功'
      })
    })
  })
}
