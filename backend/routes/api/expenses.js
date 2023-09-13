const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../../controllers/expenseController');
const router = require('express').Router();
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.post('/:id', addExpense);
router.get('/:userId', getExpenses);
router.put('/:userId/:id', updateExpense);
router.delete('/:userId/:id', deleteExpense);

module.exports = router;
