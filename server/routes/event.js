const router = require('express').Router();
const { eventControllers } = require('../controllers/')

router.get('/all', eventControllers.getAllEvents)

module.exports = router;