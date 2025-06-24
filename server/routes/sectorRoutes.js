const express = require('express');
const router = express.Router();
const {
  getSectors,
  addSector,
  updateSector,
  deleteSector
} = require('../controllers/sectorController');

router.get('/', getSectors);
router.post('/', addSector);
router.put('/:id', updateSector);
router.delete('/:id', deleteSector);

module.exports = router;
