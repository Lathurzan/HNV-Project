const express = require('express');
const router = express.Router();
const {
  getSectors,
  addSector,
  updateSector,
  deleteSector,
  getSectorCount // <-- import the missing function
} = require('../controllers/sectorController');

router.get('/', getSectors);
router.post('/', addSector);
router.put('/:id', updateSector);
router.get('/count', getSectorCount);
router.delete('/:id', deleteSector);

module.exports = router;
