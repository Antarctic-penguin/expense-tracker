const Handlebars = require("handlebars")

Handlebars.registerHelper("helper1", (a, b, options) => {
  if (a === b) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

Handlebars.registerHelper("helper2", (a, b, options) => {

  if (String(a) === b) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})