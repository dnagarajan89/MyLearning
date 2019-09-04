if(process.env.NODE_ENV !== 'production') {
    require('dotenv')
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
}, (err) => console.error(err))
const db = mongoose.connection
db.on('err', err => console.error(err))
db.once('open', () => console.log("Connected to MongoDB"))


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () => console.log('Server is listening on port ' + (process.env.PORT || 3000)))
