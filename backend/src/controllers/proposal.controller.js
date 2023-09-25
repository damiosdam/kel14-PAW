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
        });
    } catch (error) {
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { namaKegiatan, tempat, jumlahMahasiswaTerlibat, jumlahDosenTerlibat, biayaYangDiajukan, biayaYangDigunakan, narahubung, waktuKegiatan } = req.body;
        const cekProposal = await ProposalModel.findOne({ namaKegiatan: namaKegiatan });
        if (cekProposal) {
            const error = new ErrorHandler(400, "Proposal dengan nama kegiatan tersebut sudah ada");
            return next(error);
        } else {
            const proposal = new ProposalModel({
                namaKegiatan: namaKegiatan,
                tempat: tempat,
                jumlahMahasiswaTerlibat: jumlahMahasiswaTerlibat,
                jumlahDosenTerlibat: jumlahDosenTerlibat,
                biayaYangDiajukan: biayaYangDiajukan,
                biayaYangDigunakan: biayaYangDigunakan,
                waktuKegiatan : waktuKegiatan,
                narahubung: narahubung
            });
            await proposal.save();
            res.status(200).json({
                error: false,
                message: "Berhasil menyimpan data proposal",
                data: proposal
            });
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.show = async (req, res, next) => {
    const idProposal = req.params.id;
    try {
        const proposal = await ProposalModel.findOne({ idProposal: idProposal });
        if (!proposal) {
            const error = new ErrorHandler(400, "Proposal tidak ditemukan");
            return next(error);
        } else {
            res.status(200).json({
                error: false,
                data: proposal
            });
        }
    } catch (error) {
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    const idProposal = req.params.id;
    try {
        const proposal = await ProposalModel.findOne({ idProposal: idProposal });
        if (!proposal) {
            const error = new ErrorHandler(400, `Proposal dengan id ${idProposal} tidak ada`);
            return next(error);
        } else {
            const updatedData = req.body;
            for (let key in updatedData) {
                proposal[key] = updatedData[key];
            }
            await proposal.save();
            res.status(200).json({
                error: false,
                message: "Berhasil memperbarui data proposal"
            });
        }
    } catch (error) {
        return next(error);
    }
};

exports.delete = async (req, res, next) => {
    const idProposal = req.params.id;
    try {
        const proposal = await ProposalModel.findOneAndDelete({ idProposal: idProposal });
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
};
