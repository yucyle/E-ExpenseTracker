const { addIncome, getIncomes, updateIncome, deleteIncome } = require('../../controllers/incomeController');
const router = require('express').Router();
const ROLES_LIST = require('../../config/roles_list');
// const verifyJWT = require('../../middleware/verifyJWT');

router.post('/:id', addIncome);
router.get('/:userId', getIncomes);
router.put('/:userId/:id', updateIncome);
router.delete('/:userId/:id', deleteIncome);

module.exports = router;
