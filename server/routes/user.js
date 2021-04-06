const router = require('express').Router();
const { userControllers } = require('../controllers')

router.post('/login', userControllers.userLogin)
router.post('/create', userControllers.userCreate)
module.exports = router;