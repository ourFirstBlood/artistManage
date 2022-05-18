const express = require('express')
const xtpl = require('xtpl')
const cookieParase = require('cookie-parser')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty');
const path = require('path')

const Ut = require('./router/utils/util.js')

const artist = require('./router/artist/index.js')
const power = require('./router/power/index.js')
const user = require('./router/user/index.js')
const login = require('./router/login/index.js')
const notice = require('./router/notice/index.js')
const wage = require('./router/wage/index.js')

const app = express()
const router = express.Router()
const multipartMiddleware = multipart();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(cookieParase('_ivv_token_sign_key'))

app.post('*', function (req, res, next) {
  const allowOrigins = ['http://www.ivvmedia.cn', 'http://www.ivvmedia.com']
  if (allowOrigins.includes(req.headers.origin) || process.env.NODE_ENV === 'development') {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Headers', 'content-type')
    res.header('Access-Control-Allow-Methods', 'POST,GET')
    res.header('Content-Type', 'application/json;charset=utf-8')

    const notJudge = ['/login', '/notice/get_list', '/wage/get_list'] //不校验登录的
    if (notJudge.indexOf(req.path) === -1) {
      if (!req.signedCookies._ivv_token) {
        Ut.fail(res, {
          code: 996,
          msg: '登陆超时'
        })
        return
      } else {
        Ut.getUserInfo(req, res).then(() => {
          res.cookie('_ivv_token', req.signedCookies._ivv_token, {
            maxAge: 1000 * 60 * 120,
            signed: true
          })
          if (req.method.toLowerCase() == 'options') res.send(200)
          else next()
        })
      }
    } else {
      if (req.method.toLowerCase() == 'options') res.send(200)
      else next()
    }
  }
})

// 设置静态资源文件夹为static
app.use(express.static(path.resolve(__dirname, '../view/build')))
//设置模板,会自动去views文件夹中查找.html
app.set('views', path.resolve(__dirname, '../view/build'))
//设置当前视图引擎中的模板的扩展名.html
app.set('views engine', '.html')
//设置解析views/.html模板的方法xtpl.renderFile,它会自动代替res.render()方法，从而使得程序的扩展性变强
app.engine('html', xtpl.renderFile)

router.get('*', (req, res) => {
  res.render('index.html', {}, (err, content) => {
    if (err) {
      console.log(err)
      return
    }
    res.end(content)
  })
})

app.use('/artist', multipartMiddleware, artist)
app.use('/power', multipartMiddleware, power)
app.use('/user', multipartMiddleware, user)
app.use('/login', multipartMiddleware, login)
app.use('/notice', multipartMiddleware, notice)
app.use('/wage', multipartMiddleware, wage)
app.use('/', router)

app.listen('8081', () => {
  console.log('http://127.0.0.1:8081')
})