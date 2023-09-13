const ExpenseSchema = require('../models/expenseModel');
const User = require("../models/userModel.js");

const addExpense = async (req, res) => {
    const { id } = req.params;
    const {title, amount, type, category, description, date} = req.body;
    const expense = ExpenseSchema({
        userId: id,
        title, 
        amount,
        type,
        category,
        description,
        date
    })

    try {
        //validation
        if (!id) {
            return res.status(400).json({ message: 'userId is required!' });
        }
        const foundUser = await User.findById(id);
        if (foundUser === null) {
            console.log("No match id");
            return res.status(204).json({message: `No user matches ID ${id}.`});
        }
        // if (!title || !category || !description || !date) {
        //     return res.status(400).json({message: 'All fields are required!'});
        // }
        if (typeof(amount) !== 'string' || !Number(amount) || Number(amount) <= 0) {
            return res.status(400).json({message: 'Amount must be a positive number!'});
        }
        await expense.save();
        res.status(200).json({message: 'Expense Added!'});
    } catch (err) {
        res.status(500).json({message: 'Server Error!'})
    }
};

const getExpenses = async (req, res) => {
    try {
        const { userId } = req.params;
        const expenses = await ExpenseSchema.find({ userId: userId }).sort({createdAt: -1});
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({message: 'Server Error!'});
    }
};

const updateExpense = async (req, res) => {
    try {
        const { userId, id } = req.params;
        const updates = req.body;
        const expense = await ExpenseSchema.findByIdAndUpdate({userId: userId, _id: id}, updates, {new: true});
        res.status(200).json({expense});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server Error!'});
    }
}

const deleteExpense = async (req, res) => {
    const { userId, id } = req.params;
    ExpenseSchema.findByIdAndDelete({userId: userId, _id: id})
        .then((expense) => {
            res.status(200).json({message: 'Expense Deleted!'}); 
        })
        .catch((err) => {
            res.status(500).json({message: 'Server Error!'});
        })
}

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };