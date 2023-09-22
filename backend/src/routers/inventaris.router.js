const express = require('express')
const router = express.Router()

// ? Desc:    Load Controllers
const InventarisController = require('../controllers/inventaris.controller')
const { uploadFile } = require("../middlewares/uploadFile");

const uploadLeader = uploadFile.fields({ name: 'foto', maxCount: 1 })

router.get('/', InventarisController.index);
router.post('/', uploadLeader, InventarisController.create);
router.get('/:id', InventarisController.show);
router.put('/:id', InventarisController.update);
router.delete('/:id', InventarisController.delete);

module.exports = router