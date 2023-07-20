const db = require('../../config/mongoose.js')
const Category = require('../category')
const seedCategory = require('./category.json')


db.once('open', () => {
  Category
    .create(seedCategory)
    .then(() => {
      console.log('Category seeder is done!')
      process.exit()
    })
    .catch(error => console.error(error))
})