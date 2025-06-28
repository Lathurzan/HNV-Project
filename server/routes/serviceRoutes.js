const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.getAllServices);
router.post('/', serviceController.addService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);
router.get('/count', serviceController.getServiceCount);
router.patch('/:id/toggle', serviceController.toggleServiceActive);

module.exports = router;
