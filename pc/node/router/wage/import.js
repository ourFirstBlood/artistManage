const nodeExcel = require('node-xlsx');
const {
  fail,
  success,
  sql_update
} = require('../utils/util.js')

module.exports = async function (req, res) {
  const file = req.files.file
  const {
    pid
  } = req.body

  if (!pid || !file) {
    fail(res, {
      msg: '缺少参数'
    })
    return
  }

  const {
    data
  } = nodeExcel.parse(file.path)[0]
  if (data.length) {
    const list = data.reduce((arr, item, index) => {
      if (index !== 0) {
        const [name, imcome, ...others] = item
        if (name && imcome) {
          const otherVal = others.map(item => {
            if (typeof item === 'undefined') {
              return '-'
            }
            return item
          })
          const opt = [0, name, imcome, otherVal.join(','), pid]
          arr.push(opt)
        }
      }
      return arr
    }, [])
    const sql = "INSERT INTO wage(`id`,`name`,`income`,`others`,`pid`) VALUES ?"
    await sql_update(sql, [list], res)
    success(res)
  } else {
    fail(res, {
      msg: 'excel为空'
    })
  }

}