const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./server/routes/api')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', api)

mongoose.connect("mongodb://localhost/nasaImages", { useNewUrlParser: true, useUnifiedTopology: true })

const port = 4000
app.listen(port, function(req, res){
    console.log('running on ' + port);
})