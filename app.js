const express = require('express')
const mongoose = require('mongoose')
const url='mongodb://localhost/ContacB'
var port = process.env.PORT || 3000;

const app=express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', ()=>{
    console.log('connected...')
})

app.use(express.json())

const ContacBRouter = require('./routes/contact')

app.use('/contact',ContacBRouter)

app.listen(port, ()=> {
    console.log(`Running contact Book api on port  ${port}`);
});