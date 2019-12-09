var qs = require('querystring')
var common = require('../utils/util.js')
var nodeExcel = require('excel-export')
var mysqlconnection = require('../../mysql/index.js')

mysqlconnection.handleDisconnection()

exports.add_artists = (req, res) => {
  let { id, info } = req.body
  let _info = {}
  if (!id || !info) {
    common.fail(res, { msg: '参数不完整' })
    return
  }
  try {
    _info = JSON.parse(info)
  } catch (e) {
    common.fail(res, { msg: '数据格式错误' })
    return
  }
  if (id == 0) {
    var sql = 'INSERT INTO artistsList(id,info) VALUES(0,?)'
    common.sql_update(sql, [qs.stringify(qs.parse(info))], res).then(() => {
      common.success(res)
    })
  } else {
    var userModSql = 'UPDATE artistsList SET info = ? WHERE id =' + id
    var userModSql_Params = [qs.stringify(qs.parse(info))]
    common.sql_update(userModSql, userModSql_Params, res).then(() => {
      common.success(res)
    })
  }
}

exports.detele_artists = (req, res) => {
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
  let sqlArr = '(' + ids.join(',') + ')'
  var sql = 'DELETE FROM artistsList WHERE id IN ' + sqlArr
  common.sql_select(sql, res).then(result => {
    common.success(res)
  })
}

exports.detail = (req, res) => {
  var sql = 'SELECT * FROM artistsList WHERE id = ' + req.body.id
  common.sql_select(sql, res).then(result => {
    if (!result.length) {
      common.fail(res, { msg: '该数据不存在' })
      return
    }
    common.success(res, {
      data: (function() {
        let arrStr = ''
        for (let key in qs.parse(result[0].info)) {
          arrStr = key
        }
        return JSON.parse(arrStr)
      })()
    })
  })
}

exports.get_artistsList = (req, res) => {
  let { page, page_size } = req.body
  var countSql = 'SELECT count(*) FROM artistsList'
  common.sql_select(countSql, res).then(result => {
    let count = result[0]['count(*)']
    var sql =
      'SELECT * FROM artistsList order by id desc limit ' +
      (page - 1) * page_size +
      ',' +
      page_size
    //查
    common.sql_select(sql, res).then(result => {
      let list = []
      result.forEach(item => {
        let arrStr = ''
        for (let key in qs.parse(item.info)) {
          arrStr = key
        }
        let arr = JSON.parse(arrStr)
        list.push({
          id: item.id,
          info: {
            custom: arr.filter(item => {
              return item.sign === 'custom'
            }),
            fixed: arr.filter(item => {
              return item.sign === 'fixed'
            })
          }
        })
      })
      common.success(res, {
        data: {
          count,
          list
        }
      })
    })
  })
}
// 导出为excel
exports.exportsExcel = (req, res) => {
  var sql = 'SELECT * FROM artistsList order by id desc'
  common.sql_select(sql, res).then(result => {
    let list = []
    result.forEach(item => {
      let arrStr = ''
      for (let key in qs.parse(item.info)) {
        arrStr = key
      }
      arr = JSON.parse(arrStr)
      list.push(arr)
    })
    let indexFormat = list[0]
    var conf = {}
    // conf.stylesXmlFile = 'styles.xml'
    conf.name = 'mysheet'
    conf.cols = (() => {
      let arr = []
      indexFormat.forEach(item => {
        arr.push({
          caption: item.name,
          type: 'string',
          beforeCellWrite: function(row, cellData) {
            return cellData ? cellData.toUpperCase() : ''
          },
          width: 28.7109375
        })
      })
      return arr
    })()
    conf.rows = (() => {
      let arr = []
      list.forEach(item => {
        let childArr = []
        item.forEach(opt => {
          childArr.push(opt.value.toString())
        })
        arr.push(childArr)
      })
      return arr
    })()
    var result = nodeExcel.execute(conf)
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats;charset=utf-8'
    )
    let name = encodeURI(
      '艺人表' + common.formatTime(new Date(), 'YYYYMMDDHHmmss')
    )
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + name + '.xlsx'
    )
    res.end(result, 'binary')
  })
}
