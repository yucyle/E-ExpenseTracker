const mongoose = require('mongoose');
const IncomeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 25,
        trim: true
    },
    type: {
        type: String,
        default: "income"
    },
    date: {
        type: String,
        // required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
}, {timestamps: true})

module.exports = mongoose.model('incomes', IncomeSchema); //name of collection