const router = require('express').Router();
const { userControllers } = require('../controllers')

router.get('/', userControllers.getUsers)
router.get('/:id', userControllers.getUser)
router.post('/login', userControllers.userLogin)
router.post('/create', userControllers.userCreate)
router.patch('/update', userControllers.userUpdate)
router.delete('/delete/:id', userControllers.userDelete)
router.post('/checkCurrentUser', userControllers.checkCurrentUser)
module.exports = router;