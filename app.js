// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const helper = require("./handlebarsHelper")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 載入passport設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

const routes = require('./routes')
require('./config/mongoose')
const PORT = process.env.PORT || 3000

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: helper }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// 呼叫 usePassport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// 用app.use 代表這組 middleware 會作用於所有的路由
app.use(flash())  // 掛載套件
app.use((req, res, next) => {
  // 把 req.isAuthenticated() 回傳的布林值，交接給 res 使用
  res.locals.isAuthenticated = req.isAuthenticated()
  // 把使用者資料交接給 res 使用
  res.locals.user = req.user
  // 設定 success_msg 訊息
  res.locals.success_msg = req.flash('success_msg')
  // 設定 warning_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 路由
app.use(routes)

// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})