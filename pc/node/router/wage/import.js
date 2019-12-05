const nodeExcel = require('node-xlsx');
const {
  fail,
  success,
  sql_update
} = require('../utils/util.js')

module.exports = async function (req, res) {
  const file = req.files.file
  const {
    date
  } = req.body

  if (!date || !file) {
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
        const [name, imcome] = item
        if (name && imcome) {
          const opt = [0, name, imcome, new Date(date)]
          arr.push(opt)
        }
      }
      return arr
    }, [])
    const sql = "INSERT INTO wage(`id`,`name`,`income`,`date`) VALUES ?"
    await sql_update(sql, [list], res)
    success(res)
  } else {
    fail(res, {
      msg: 'excel为空'
    })
  }

}