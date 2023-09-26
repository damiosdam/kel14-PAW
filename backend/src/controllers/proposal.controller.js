
const ProposalModel = require("../models/proposal.model");
const ErrorHandler = require("../utils/error-handler");
const { uploadFileToGdrive, deleteFile } = require("../services/upload-file.service");

exports.index = async (req, res, next) => {
    try {
        const proposals = await ProposalModel.find();
        if (!proposals) {
            const error = new ErrorHandler(400, "Data Proposal tidak ditemukan");
            return next(error);
        }
        res.status(200).json({
            error: false,
            data: proposals
        })
    } catch (error) {
        return next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const { namaKegiatan, tempat, waktuKegiatan, jumlahMahasiswaTerlibat, jumlahDosenTerlibat, biayaYangDigunakan, biayaYangDiajukan, narahubung } = req.body;
        
        const cekProposal = await ProposalModel.findOne({ namaKegiatan: namaKegiatan });
        if (cekProposal) {
            const error = new ErrorHandler(400, "Proposal sudah ada");
            return next(error);
        }

        let proposalFile = {};
        if (req.files && req.files.proposalFile) {
            proposalFile = await uploadFileToGdrive(req.files);
        }

        const proposal = new ProposalModel({
            namaKegiatan: namaKegiatan,
            tempat: tempat,
            waktuKegiatan: waktuKegiatan,
            jumlahMahasiswaTerlibat: jumlahMahasiswaTerlibat,
            jumlahDosenTerlibat: jumlahDosenTerlibat,
            biayaYangDigunakan: biayaYangDigunakan,
            biayaYangDiajukan: biayaYangDiajukan,
            narahubung: narahubung,
            proposalFile: proposalFile.proposalFile
        });

        await proposal.save();
        res.status(200).json({
            error: false,
            message: "Berhasil menyimpan data",
            data: proposal
        });
    } catch (error) {
        return next(error);
    }
}

exports.show = async (req, res, next) => {
    const idProposal = req.params.id;
    try {
        const proposal = await ProposalModel.findOne({ _id: idProposal });
        if (!proposal) {
            const error = new ErrorHandler(400, `Proposal dengan id ${idProposal} tidak ada`);
            return next(error);
        }
        res.status(200).json({
            error: false,
            data: proposal
        });
    } catch (error) {
        return next(error);
    }
}

exports.update = async (req, res, next) => {
    const idProposal = req.params.id;
    try {
        const { namaKegiatan, tempat, waktuKegiatan, jumlahMahasiswaTerlibat, jumlahDosenTerlibat, biayaYangDigunakan, biayaYangDiajukan, narahubung } = req.body;
        const proposal = await ProposalModel.findOne({ _id: idProposal });

        if (!proposal) {
            const error = new ErrorHandler(400, `Proposal dengan id ${idProposal} tidak ada`);
            return next(error);
        } else {
            const { proposalFile } = await uploadFileToGdrive(req.files);
            if (namaKegiatan != undefined) {
                proposal.namaKegiatan = namaKegiatan;
            }
            if (tempat != undefined) {
                proposal.tempat = tempat;
            }
            if (waktuKegiatan != undefined) {
                proposal.waktuKegiatan = waktuKegiatan;
            }
            if (jumlahMahasiswaTerlibat != undefined) {
                proposal.jumlahMahasiswaTerlibat = jumlahMahasiswaTerlibat;
            }
            if (jumlahDosenTerlibat != undefined) {
                proposal.jumlahDosenTerlibat = jumlahDosenTerlibat;
            }
            if (biayaYangDigunakan != undefined) {
                proposal.biayaYangDigunakan = biayaYangDigunakan;
            }
            if (biayaYangDiajukan != undefined) {
                proposal.biayaYangDiajukan = biayaYangDiajukan;
            }
            if (narahubung != undefined) {
                proposal.narahubung = narahubung;
            }
            if (proposalFile != undefined) {
                await deleteFile(proposalFile.proposalFile.fileId);
                proposal.proposalFile = proposalFile;
            }
            proposal.save();
            res.status(200).json({
                error: false,
                data: "Berhasil memperbarui data proposal"
            });
        }
    } catch (error) {
        return next(error);
    }
}

exports.delete = async (req, res, next) => {
    const idProposal = req.params.id;
    try {
        const proposal = await ProposalModel.findByIdAndRemove(idProposal);
        if (!proposal) {
            const error = new ErrorHandler(404, "Proposal tidak ditemukan");
            return next(error);
        }
        res.status(200).json({
            error: false,
            message: "Berhasil menghapus proposal"
        });
    } catch (error) {
        return next(error);
    }
}
