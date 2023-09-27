const express = require('express');
const router = express.Router();

const PersuratanController = require('../controllers/persuratan.controller');
const { uploadFile } = require('../middlewares/uploadFile');

const uploadPersuratan = uploadFile.fields([{ name: 'fileUrlSurat', maxCount: 1 }]);

router.get('/', PersuratanController.index);
router.post('/', uploadPersuratan, PersuratanController.create);
router.get('/:id', PersuratanController.show);
router.put('/:id', uploadPersuratan, PersuratanController.update);
router.delete('/:id', PersuratanController.delete);

module.exports = router;
