const express = require('express')
const router = express.Router()

// ? Desc:    Load Controllers
const InventarisController = require('../controllers/inventaris.controller')
const { uploadFile } = require("../middlewares/uploadFile");
const {
    ensureAuth
} = require('../middlewares/auth.middleware')
const uploadInventaris = uploadFile.fields([{ name: 'foto', maxCount: 1 }])

router.use(ensureAuth)
router.get('/', InventarisController.index);
router.post('/', uploadInventaris, InventarisController.create);
router.get('/:id', InventarisController.show);
router.put('/:id', uploadInventaris, InventarisController.update);
router.delete('/:id', InventarisController.delete);
router.get('/kategori/:kategori', InventarisController.getInventoryByCategory);

module.exports = router