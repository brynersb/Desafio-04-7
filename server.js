const express = require('express')
const nunjucks = require('nunjucks')
const server = express()
const routes = require('./routes')
const methodOverride = require('method-override')


server.set('view engine', 'njk')



server.use(express.urlencoded({ extended: true })) // respoasvel por fazer funcionar o req.body
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)


nunjucks.configure("views", {
    express: server,
    noCache: true,
    autoescape: false

})



server.listen(5500, function () {
    console.log("server is running!!!")
})