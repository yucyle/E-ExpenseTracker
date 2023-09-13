// const { default: mongoose } = require('mongoose');
const IncomeSchema = require('../models/incomeModel');
const User = require("../models/userModel.js");

const addIncome = async (req, res) => {
    const { id } = req.params;
    const {title, amount, type, category, description, date} = req.body;
    const income = IncomeSchema({
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
        // const foundUser = await User.findOne({ _id: req.body.userId }).exec();
        const foundUser = await User.findById(id);
        // console.log(foundUser);
        if (foundUser === null) {
            console.log("No match id");
            return res.status(204).json({message: `No user matches ID ${id}.`});
        }
        // console.log(title, category, description, date);
        // if (!title || !category || !description ) {
        //     return res.status(400).json({message: 'All fields are required!'});
        // }
        // console.log(typeof(amount) , Number(amount));
        if (typeof(amount) !== 'string' || !Number(amount) || Number(amount) <= 0) {
            return res.status(400).json({message: 'Amount must be a positive number!'});
            // return res.status(400).json({message: typeof(amount)});
        }
        await income.save();
        return res.status(200).json(income);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Server Error!'})
    } 
}; 

const getIncomes = async (req, res) => {
    try {
        const { userId } = req.params;
        const incomes = await IncomeSchema.find({ userId: userId }).sort({createdAt: -1});
        return res.status(200).json(incomes);
    } catch (err) {
        return res.status(500).json({message: 'Server Error!'});
    }
};

const updateIncome = async (req, res) => {
    try {
        const { userId, id } = req.params;
        const updates = req.body;
        const income = await IncomeSchema.findByIdAndUpdate({userId: userId, _id: id}, updates, {new: true});
        return res.status(200).json({message: 'Income Updated!'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Server Error!'});
    }
}

const deleteIncome = async (req, res) => {
    const { userId, id } = req.params;
    IncomeSchema.findByIdAndDelete({userId: userId, _id: id})
        .then((income) => {
            return res.status(200).json({message: 'Income Deleted!'}); 
        })
        .catch((err) => {
            return res.status(500).json({message: 'Server Error!'});
        })
}

module.exports = { addIncome, getIncomes, updateIncome, deleteIncome }