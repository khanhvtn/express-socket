const router = require('express').Router();
const { userControllers } = require('../controllers')

router.post('/login', userControllers.userLogin)
module.exports = router;