const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount: Number,
    vendor: String,
    category: String,
    date: Date
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction