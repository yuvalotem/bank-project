const express = require('express')
const axios = require('axios')
const Transaction = require('../../transactionSchema')

const route = express()

route.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

route.get('/transactions', async function (req, res){
    const trans = await Transaction.find({})
    res.send(trans)
})

route.post("/transaction", async (req, res) => {
    const transaction = req.body
    const t = new Transaction(transaction)
    await t.save()
    res.send(t)
})

route.delete('/transaction/:id', async function (req, res){
    const {id} = req.params
    const removed = await Transaction.findByIdAndRemove(id)
    res.send(removed)
})

module.exports = route