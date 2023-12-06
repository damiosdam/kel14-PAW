const express = require('express');
const router = express.Router();

const AnggotaController = require('../controllers/anggota.controller');
const { uploadFile } = require('../middlewares/uploadFile');
const {
    ensureAuth
} = require('../middlewares/auth.middleware')
const uploadAnggota = uploadFile.fields([{ name: 'foto', maxCount: 1 }]);

router.use(ensureAuth)
router.get('/', AnggotaController.index);
router.post('/', uploadAnggota, AnggotaController.create);
router.get('/:id', AnggotaController.show);
router.put('/:id', uploadAnggota, AnggotaController.update);
router.delete('/:id', AnggotaController.delete);

module.exports = router;