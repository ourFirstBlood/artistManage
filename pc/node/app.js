const express = require('express')
const bodyParser = require('body-parser')
const xtpl = require('xtpl')
const fs = require('fs')
const app = express()
const artist = require('./router/artist/index.js')
const power = require('./router/power/index.js')
const user = require('./router/user/index.js')
const login = require('./router/login/index.js')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', 'POST,GET')
  res.header('Content-Type', 'application/json;charset=utf-8')
  if (req.method.toLowerCase() == 'options') res.send(200)
  else next()
})

app.use('/artist', artist)
app.use('/power', power)
app.use('/user', user)
app.use('/login', login)

// 设置静态资源文件夹为static
app.use(express.static('./dist'))
//设置模板,会自动去views文件夹中查找.html
app.set('views', './dist')
//设置当前视图引擎中的模板的扩展名.html
app.set('views engine', '.html')
//设置解析views/.html模板的方法xtpl.renderFile,它会自动代替res.render()方法，从而使得程序的扩展性变强
app.engine('html', xtpl.renderFile)

app.listen('8080', () => {
  console.log('http://127.0.0.1:8080')
})
