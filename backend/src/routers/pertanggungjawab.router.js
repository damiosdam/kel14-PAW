const express = require("express");
const router = express.Router();

const PertanggungjawabController = require("../controllers/pertanggungjawab.controller");
const { uploadFile } = require("../middlewares/uploadFile");

const uploadLPJ = uploadFile.fields([{ name: "fileLPJ", maxCount: 1 }]);

router.get("/", PertanggungjawabController.index);
router.post("/", uploadLPJ, PertanggungjawabController.create);
router.get("/:id", PertanggungjawabController.show);
router.put("/:id", uploadLPJ, PertanggungjawabController.update);
router.delete("/:id", PertanggungjawabController.delete);

module.exports = router;
