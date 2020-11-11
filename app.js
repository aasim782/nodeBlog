const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

// mongodb
mongoose.connect('mongodb://localhost:27017/nodeBlog', {useNewUrlParser: true, useUnifiedTopology: true})


const app = express()

const blogRouter = require('./routes/blog')

// static files
app.use(express.static(__dirname + '/public'))


// view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// extras
app.use(bodyParser.urlencoded({ extended: false }))


// blog routes
app.use(blogRouter)

app.use((req, res) => {
  res.render('404', {
    title: '404'
  })
})

app.listen(3000, () => {
  console.log("Listening...")
})