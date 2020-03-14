const nodeExcel = require('node-xlsx');
const {
  fail,
  success,
  sql_update
} = require('../utils/util.js')

module.exports = async function (req, res) {
  const file = req.files.file
  const {
    pid,
    type
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
        let name, income, others
        //短视频
        if (type == 0) {

          name = item[0]
          income = item[1]
          others = ''
          //直播
        } else {
          name = item[2]
          income = item[10]
          others = item.map(item => {
            if (typeof item === 'undefined') {
              return '-'
            }
            return item
          }).join(',')
        }
        if (name && income) {
          const opt = [0, name, income, others, pid]
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