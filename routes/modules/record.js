const express = require('express')        // 引用 Express 與 Express 路由器
const router = express.Router()          // 準備引入路由模組
const record = require('../../models/record')
const categoryData = require('../../models/category')

// 新增資料的頁面
router.get('/new', (req, res) => {
  categoryData.find()
    .lean()
    .then(category => {
      res.render('new', { category })
    })
    .catch(error => console.error(error))
})

// 使用者新增資料後處理路由
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  categoryData.findOne({ name: category })
    .then(categoryID => {
      record.create({ name, userId, date, amount, category: categoryID._id })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

// 修改資料的頁面
router.get('/edit/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  categoryData.find()
    .lean()
    .then(categoryList => {
      record.findOne({ _id, userId })
        .populate('category')
        .lean()
        .then((record) => res.render('edit', { record, categoryList }))
        .catch(error => console.log(error))
    })
    .catch(error => console.error(error))
})

// 使用者修改資料後的路由
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, category } = req.body

  record.findOne({ _id, userId })
    .then(record => {
      Object.assign(record, { name, date, amount, category });
      return record.save()
    })
    .then(() => res.redirect(`/record/edit/${_id}`))
    .catch(error => console.log(error))
})

// 搜尋功能
router.get('/search', (req, res) => {
  const category = req.query.category
  const userId = req.user._id
  if (category === 'all') {
    return res.redirect('/')
  }
  categoryData.find()
    .lean()
    .then(categoryList => {
      record.find({ userId, category })
        .populate('category')
        .lean()
        .then(record => {
          let totalAmount = 0
          record.forEach(element => {
            totalAmount = totalAmount + element.amount
          });
          res.render('search', { category, categoryList, record, totalAmount })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

// 使用者刪除資料的路由
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router                // 匯出路由模組