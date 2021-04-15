const router = require('express').Router();
const { facilityControllers } = require('../controllers')


router.get('/', facilityControllers.getFacilities)
router.get('/:id', facilityControllers.getFacility)
router.post('/create', facilityControllers.facilityCreate)
router.post('/delete/:id', facilityControllers.facilityDelete)


module.exports = router;