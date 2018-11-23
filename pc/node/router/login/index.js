module.exports = (req, res) => {
  console.log(req.body)
  res.send({ code: 0, data: [], msg: '成功' })
}
