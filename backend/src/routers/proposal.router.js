const express = require('express');
const router = express.Router();

const ProposalController = require('../controllers/proposal.controller');
const { uploadFile } = require("../middlewares/uploadFile");

const uploadProposal = uploadFile.fields({ name: 'proposalFile', maxCount: 1 });

router.get('/', ProposalController.index);
router.post('/', uploadProposal, ProposalController.create);
router.get('/:id', ProposalController.show);
router.put('/:id', ProposalController.update);
router.delete('/:id', ProposalController.delete);

module.exports = router;
